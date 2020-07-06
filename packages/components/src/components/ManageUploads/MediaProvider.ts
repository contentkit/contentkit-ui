import gql from 'graphql-tag'

export const POST_QUERY = gql`
  query ($id: String!) {
    posts (where: { id: { _eq: $id } }) {
      id
      created_at
      published_at
      title
      slug
      status
      excerpt
      raw
      encoded_html
      cover_image_id
      images {
        id
        url
      }
      project {
        id
      }
    }
  }
`

export const DELETE_IMAGE = gql`
  mutation ($id: String!) {
    delete_images (where: { id: { _eq: $id } }) {
      returning {
        id
      }
    } 
  }
`

export const CREATE_IMAGE = gql`
  mutation ($url: String!, $postId: String!, $userId: String!) {
    insert_images (objects: { url: $url, post_id: $postId, user_id: $userId }) {
      returning {
        id
        url
      }
    } 
  }
`

export const UPLOAD_MUTATION = gql`
  mutation($userId: String!, $key: String!) {
    createPresignedPost(userId: $userId, key: $key) {
      url
      fields
    }
  }
`


function getDeleteMediaMutationOptions ({ id, postId }) {
  return {
    mutation: DELETE_IMAGE,
    variables: { id },
    optimisticResponse: {
      __typename: 'Mutation',
      delete_images: {
        __typename: 'images_mutation_response',
        response: [{
          __typename: 'Image',
          id
        }]
      }
    },
    update: (store, { data: { delete_images } }) => {
      const { posts } = store.readQuery({
        query: POST_QUERY,
        variables: { id: postId }
      })
      store.writeQuery({
        query: POST_QUERY,
        data: {
          posts: [{
            ...posts[0],
            images: posts[0].images.filter(img => img.id !== id)
          }]
        },
        variables: posts.variables
      })
    }
  }
}

function getCreateMediaMutationOptions (variables) {
  return {
    mutation: CREATE_IMAGE,
    variables,
    optimisticResponse: {
      __typename: 'Mutation',
      insert_images: {
        __typename: 'images_mutation_response',
        returning: [{
          __typename: 'Image',
          id: variables.url,
          ...variables
        }]
      }
    },
    update: (store, { data: { insert_images } }) => {
      const { posts } = store.readQuery({
        query: POST_QUERY,
        variables: { id: variables.postId }
      })
      store.writeQuery({
        query: POST_QUERY,
        data: {
          posts: [{
            ...posts[0],
            images: [...posts[0].images].concat(insert_images.returning)
          }]
        },
        variables: posts.variables
      })
    }
  }
}

type CreatePresignedPostVariables = {
  userId: string,
  key: string
}

type CreateMediaVariables = {
  userId: string,
  postId: string,
  url: string
}

function getCreatePresignedPostMutationOptions (variables) {
  return {
    mutation: UPLOAD_MUTATION,
    variables
  }
}

type ExecuteMediaUploadOptions = {
  url: string,
  fields: any 
}

type MediaProviderConfig = {
  baseUrl: string
}

class MediaProvider {
  config: any
  client: any
  constructor (config, client) {
    this.config = config
    this.client = client
  }

  getSrc = (path) => {
    return `${this.config.baseUrl}${path}`
  }

  deleteMedia = (variables: { id: string, postId: string }) => {
    return this.client.mutate(getDeleteMediaMutationOptions(variables))
  }

  createMedia = (variables: CreateMediaVariables) => {
    return this.client.mutate(getCreateMediaMutationOptions(variables))
  }

  createPresignedPost = (variables: CreatePresignedPostVariables): Promise<ExecuteMediaUploadOptions> => {
    return this.client.mutate(getCreatePresignedPostMutationOptions(variables))
      .then(({ data }) => data.createPresignedPost)
  }

  executeMediaUpload = (file, { url, fields }: ExecuteMediaUploadOptions) => {
    const formData = new window.FormData()
    for (const field in fields) {
      formData.append(field, fields[field])
    }
    formData.append('file', file)

    const params = { method: 'POST', body: formData }
    return fetch(url, params).then(resp => resp.json())
  }

  uploadMedia = async (file, variables) => {
    const { userId, postId, url, key } = variables
    try {
      await this.createMedia({ userId, postId, url })
    } catch (err) {
      console.error(err)
      return
    }

    let data
    try {
      data = await this.createPresignedPost({ userId, key })
    } catch (err) {
      console.error(err)
      return
    }

    await this.executeMediaUpload(file, data)
  }

  getActions = () => {
    return {
      onDelete: this.deleteMedia,
      onUpload: this.uploadMedia
    }
  }
}

export default MediaProvider
