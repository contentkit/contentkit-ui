import { contentStateToHTML } from '@contentkit/convert'
import { EditorState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js'
import { Map, List, Repeat } from 'immutable'
import { Block } from '@contentkit/util'

const data = {
  'blocks': [
    {
      'key': 'cbvl9',
      'data': {
        'language': 'json'
      },
      'text': 'Vault Quick Start in EC2',
      'type': 'header-two'
    },
    {
      'key': 'e3ejl'
    },
    {
      'key': '7p1od',
      'data': {
        'src': 'https://s3.amazonaws.com/contentkit/static/d9920hsu8y7365frf2c6fxrx2/hashicorp.jpg'
      },
      'text': ' ',
      'type': 'atomic:image'
    },
    {
      'key': '3lck8',
      'text': 'Create an S3 Bucket for Vault',
      'type': 'header-three'
    },
    {
      'key': '4omr3',
      'data': {
        'language': 'bash'
      },
      'text': 'aws s3 create-bucket --bucket VAULT_BUCKET_NAME',
      'type': 'code-block'
    },
    {
      'key': '2b6a5',
      'text': 'Create a Vault IAM User',
      'type': 'header-three'
    },
    {
      'key': 'b9lf1',
      'text': 'Create two policies and attach them to a user, Vault.'
    },
    {
      'key': '47k74'
    },
    {
      'key': '4151a',
      'text': 'Allow access to the newly created S3 bucket:'
    },
    {
      'key': 'a2si1'
    },
    {
      'key': 'bc2f4',
      'data': {
        'language': 'json'
      },
      'text': '{',
      'type': 'code-block'
    },
    {
      'key': '96ul4',
      'data': {
        'language': ''
      },
      'text': '  "Version": "2012-10-17",',
      'type': 'code-block'
    },
    {
      'key': '4oioc',
      'data': {
        'language': ''
      },
      'text': '  "Statement": [',
      'type': 'code-block'
    },
    {
      'key': 'f52c1',
      'data': {
        'language': ''
      },
      'text': '    {',
      'type': 'code-block'
    },
    {
      'key': 'uhn1',
      'data': {
        'language': ''
      },
      'text': '      "Effect": "Allow",',
      'type': 'code-block'
    },
    {
      'key': '78apt',
      'data': {
        'language': ''
      },
      'text': '      "Action": [',
      'type': 'code-block'
    },
    {
      'key': '6ae4q',
      'data': {
        'language': ''
      },
      'text': '        "s3:*"',
      'type': 'code-block'
    },
    {
      'key': 'puef',
      'data': {
        'language': ''
      },
      'text': '      ],',
      'type': 'code-block'
    },
    {
      'key': '6tf36',
      'data': {
        'language': ''
      },
      'text': '      "Resource": ["arn:aws:s3:::VAULT_BUCKET_NAME/*"]',
      'type': 'code-block'
    },
    {
      'key': '3c026',
      'data': {
        'language': ''
      },
      'text': '    }',
      'type': 'code-block'
    },
    {
      'key': 'emq6p',
      'data': {
        'language': ''
      },
      'text': '  ]',
      'type': 'code-block'
    },
    {
      'key': '70d3h',
      'data': {
        'language': ''
      },
      'text': '}',
      'type': 'code-block'
    },
    {
      'key': 'al4b'
    },
    {
      'key': '8mg0q',
      'text': 'Allow IAM actions required by Vault: '
    },
    {
      'key': '414ac',
      'data': {
        'language': 'json'
      },
      'text': '{',
      'type': 'code-block'
    },
    {
      'key': '68vf9',
      'data': {
        'language': ''
      },
      'text': '    "Version": "2012-10-17",',
      'type': 'code-block'
    },
    {
      'key': 'b6tc8',
      'data': {
        'language': ''
      },
      'text': '    "Statement": [',
      'type': 'code-block'
    },
    {
      'key': '1icvb',
      'data': {
        'language': ''
      },
      'text': '        {',
      'type': 'code-block'
    },
    {
      'key': 'eklfk',
      'data': {
        'language': ''
      },
      'text': '            "Effect": "Allow",',
      'type': 'code-block'
    },
    {
      'key': '8h6eu',
      'data': {
        'language': ''
      },
      'text': '            "Action": [',
      'type': 'code-block'
    },
    {
      'key': '5vf8m',
      'data': {
        'language': ''
      },
      'text': '                "iam:AttachUserPolicy",',
      'type': 'code-block'
    },
    {
      'key': 'ba8hm',
      'data': {
        'language': ''
      },
      'text': '                "iam:CreateAccessKey",',
      'type': 'code-block'
    },
    {
      'key': 'anb5s',
      'data': {
        'language': ''
      },
      'text': '                "iam:CreateUser",',
      'type': 'code-block'
    },
    {
      'key': '74gp4',
      'data': {
        'language': ''
      },
      'text': '                "iam:DeleteAccessKey",',
      'type': 'code-block'
    },
    {
      'key': '8hp1k',
      'data': {
        'language': ''
      },
      'text': '                "iam:DeleteUser",',
      'type': 'code-block'
    },
    {
      'key': '8b0g8',
      'data': {
        'language': ''
      },
      'text': '                "iam:DeleteUserPolicy",',
      'type': 'code-block'
    },
    {
      'key': 'd5opd',
      'data': {
        'language': ''
      },
      'text': '                "iam:DetachUserPolicy",',
      'type': 'code-block'
    },
    {
      'key': '6th8',
      'data': {
        'language': ''
      },
      'text': '                "iam:ListAccessKeys",',
      'type': 'code-block'
    },
    {
      'key': '94r9e',
      'data': {
        'language': ''
      },
      'text': '                "iam:ListAttachedUserPolicies",',
      'type': 'code-block'
    },
    {
      'key': '7rehf',
      'data': {
        'language': ''
      },
      'text': '                "iam:ListGroupsForUser",',
      'type': 'code-block'
    },
    {
      'key': 'cr0jk',
      'data': {
        'language': ''
      },
      'text': '                "iam:ListUserPolicies",',
      'type': 'code-block'
    },
    {
      'key': 'bao6g',
      'data': {
        'language': ''
      },
      'text': '                "iam:PutUserPolicy",',
      'type': 'code-block'
    },
    {
      'key': '4rlo2',
      'data': {
        'language': ''
      },
      'text': '                "iam:RemoveUserFromGroup"',
      'type': 'code-block'
    },
    {
      'key': 'b4qb6',
      'data': {
        'language': ''
      },
      'text': '            ],',
      'type': 'code-block'
    },
    {
      'key': 'b3vv6',
      'data': {
        'language': ''
      },
      'text': '            "Resource": [',
      'type': 'code-block'
    },
    {
      'key': 'bsabj',
      'data': {
        'language': ''
      },
      'text': '                "arn:aws:iam::{AWS_ACCOUNT_ID}:user/vault-*"',
      'type': 'code-block'
    },
    {
      'key': 'cpilr',
      'data': {
        'language': ''
      },
      'text': '            ]',
      'type': 'code-block'
    },
    {
      'key': '7pgki',
      'data': {
        'language': ''
      },
      'text': '        }',
      'type': 'code-block'
    },
    {
      'key': '7ojo9',
      'data': {
        'language': ''
      },
      'text': '    ]',
      'type': 'code-block'
    },
    {
      'key': 'hlkm',
      'data': {
        'language': ''
      },
      'text': '}',
      'type': 'code-block'
    },
    {
      'key': 'dquih',
      'data': {
        'language': ''
      },
      'text': 'Create a New Security Group',
      'type': 'header-three'
    },
    {
      'key': '2iue7',
      'data': {
        'language': 'bash'
      },
      'text': "aws ec2 create-security-group --group-name vault-sg --description Vault | jq -r '.GroupId'",
      'type': 'code-block'
    },
    {
      'key': 'f97t0',
      'text': 'Expose Ports 22 and 8200',
      'type': 'header-three'
    },
    {
      'key': 'a0e16',
      'data': {
        'language': 'bash'
      },
      'text': "aws ec2 authorize-security-group-ingress --group-name vault-sg --protocol tcp --port 22 --cidr '0.0.0.0/0'",
      'type': 'code-block'
    },
    {
      'key': '9p37c',
      'data': {
        'language': ''
      },
      'text': "aws ec2 authorize-security-group-ingress --group-name vault-sg --protocol tcp --port 8200 --cidr '0.0.0.0/0'",
      'type': 'code-block'
    },
    {
      'key': '5h791',
      'text': 'Create an EC2 Instance',
      'type': 'header-three'
    },
    {
      'key': 'bb3fh',
      'text': 'Create an EC2 instance with the latest AMI, using the vault-sg security group and the IAM user created above.'
    },
    {
      'key': '518ur'
    },
    {
      'key': '3qj8l',
      'text': 'Wait a moment and SSH into the instance, then install Vault as follows:'
    },
    {
      'key': 'd63k2'
    },
    {
      'key': '5fo4i',
      'data': {
        'language': 'bash'
      },
      'text': 'cd /tmp && wget https://releases.hashicorp.com/vault/1.1.1/vault_1.1.1_linux_amd64.zip',
      'type': 'code-block'
    },
    {
      'key': 'c71fh',
      'data': {
        'language': ''
      },
      'text': 'unzip vault_1.1.1_linux_amd64.zip',
      'type': 'code-block'
    },
    {
      'key': '9e5rv',
      'data': {
        'language': ''
      },
      'text': 'cp vault /usr/bin/vault',
      'type': 'code-block'
    },
    {
      'key': 'dmc3h',
      'data': {
        'language': ''
      },
      'text': 'vault --version',
      'type': 'code-block'
    },
    {
      'key': 'aiggk',
      'text': 'Make a Vault data directory:'
    },
    {
      'key': 'b54uc'
    },
    {
      'key': '4ep8c',
      'data': {
        'language': 'bash'
      },
      'text': 'mkdir -p /etc/vault.d',
      'type': 'code-block'
    },
    {
      'key': 'e6vb0',
      'text': 'Configure Vault:'
    },
    {
      'key': '9gles'
    },
    {
      'key': 'afd9r',
      'data': {
        'language': 'bash'
      },
      'text': 'touch /etc/vault.d/vault.hcl',
      'type': 'code-block'
    },
    {
      'key': 'buh01',
      'text': 'Add the following configuration to vault.hcl:'
    },
    {
      'key': '3nake'
    },
    {
      'key': 'ej46i',
      'data': {
        'language': ''
      },
      'text': 'ui = true',
      'type': 'code-block'
    },
    {
      'key': '9q2ho',
      'data': {
        'language': ''
      },
      'type': 'code-block'
    },
    {
      'key': 'edr35',
      'data': {
        'language': ''
      },
      'text': 'listener "tcp" {',
      'type': 'code-block'
    },
    {
      'key': '38ema',
      'data': {
        'language': ''
      },
      'text': '  address = "0.0.0.0:8200"',
      'type': 'code-block'
    },
    {
      'key': 'f0qhg',
      'data': {
        'language': ''
      },
      'text': '}',
      'type': 'code-block'
    },
    {
      'key': 'j8g1',
      'data': {
        'language': ''
      },
      'type': 'code-block'
    },
    {
      'key': '1emer',
      'data': {
        'language': ''
      },
      'text': 'backend "s3" {',
      'type': 'code-block'
    },
    {
      'key': '6uu58',
      'data': {
        'language': ''
      },
      'text': '  bucket = "YOUR_AWS_BUCKET"',
      'type': 'code-block'
    },
    {
      'key': '2qfbi',
      'data': {
        'language': ''
      },
      'text': '  region = "us-east-1"',
      'type': 'code-block'
    },
    {
      'key': 'abled',
      'data': {
        'language': ''
      },
      'text': '}',
      'type': 'code-block'
    },
    {
      'key': '5a027',
      'text': 'Add systemd service file for Vault:'
    },
    {
      'key': 'f3uhi'
    },
    {
      'key': '23d13',
      'data': {
        'language': 'bash'
      },
      'text': '[Unit]',
      'type': 'code-block'
    },
    {
      'key': '7ngkf',
      'data': {
        'language': ''
      },
      'text': 'Description=Vault',
      'type': 'code-block'
    },
    {
      'key': '1n0l0',
      'data': {
        'language': ''
      },
      'text': 'Requires=network-online.target',
      'type': 'code-block'
    },
    {
      'key': '5uncc',
      'data': {
        'language': ''
      },
      'text': 'After=network-online.target',
      'type': 'code-block'
    },
    {
      'key': 'm8q2',
      'data': {
        'language': ''
      },
      'type': 'code-block'
    },
    {
      'key': '4umr4',
      'data': {
        'language': ''
      },
      'text': '[Service]',
      'type': 'code-block'
    },
    {
      'key': 'cv9k5',
      'data': {
        'language': ''
      },
      'text': 'Restart=on-failure',
      'type': 'code-block'
    },
    {
      'key': '47trb',
      'data': {
        'language': ''
      },
      'text': 'ExecStart=/usr/bin/vault server -config /etc/vault.d/vault.hcl',
      'type': 'code-block'
    },
    {
      'key': 'eqkp4',
      'data': {
        'language': ''
      },
      'text': 'ExecReload=/bin/kill -HUP $MAINPID',
      'type': 'code-block'
    },
    {
      'key': '1r1bh',
      'data': {
        'language': ''
      },
      'text': 'KillSignal=SIGTERM',
      'type': 'code-block'
    },
    {
      'key': '99ook',
      'data': {
        'language': ''
      },
      'type': 'code-block'
    },
    {
      'key': '7olst',
      'data': {
        'language': ''
      },
      'text': '[Install]',
      'type': 'code-block'
    },
    {
      'key': '81t6i',
      'data': {
        'language': ''
      },
      'text': 'WantedBy=multi-user.target',
      'type': 'code-block'
    },
    {
      'key': 'as7ja',
      'text': 'Start Vault:'
    },
    {
      'key': '5h6ss'
    },
    {
      'key': 'q6kh',
      'data': {
        'language': 'bash'
      },
      'text': 'service vault start',
      'type': 'code-block'
    },
    {
      'key': '324tc',
      'text': 'Find the public DNS associated with your EC2 instance and visit the url on port 8200:'
    },
    {
      'key': '4v0mc'
    },
    {
      'key': 'cb71v',
      'data': {
        'language': 'bash'
      },
      'text': 'https://ec2-xx-xx-xx-xx.compute-1.amazonaws.com:8200',
      'type': 'code-block'
    },
    {
      'key': '2n90t'
    }
  ]
}

it('toHtml', () => {
  const blocks = data.blocks.map(b => new ContentBlock({
    ...b,
    data: Map(b.data || {}),
    characterList: List(Repeat(new CharacterMetadata(), (b.text || '').length))
  }))
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(blocks)
  )
 
  expect(contentStateToHTML(editorState.getCurrentContent())).toMatchSnapshot()
})

it('toHtml correctly converts tables', () => {
  const blocks = [
    new ContentBlock({ text: 'Before', key: 'A' }),
    new ContentBlock({
      type: Block.TABLE,
      key: 'B',
      data: Map({
        table: [{
          key: 'A',
          row: '1',
          text: 'A'
        }, {
          key: 'B',
          row: '1',
          text: 'B'
        }, {
          key: 'C',
          row: '2',
          text: 'C'
        }]
      })
    }),
    new ContentBlock({ text: 'After', key: 'C' })
  ]
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(blocks)
  )
 
  expect(toHtml(editorState.getCurrentContent())).toMatchSnapshot()
})