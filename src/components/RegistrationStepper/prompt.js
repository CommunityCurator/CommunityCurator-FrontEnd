export const prompt = [
    {
      section: 1,
      items: [
        {
            label: 'First name',
            type: 'text',
            value: 'first_name'
        },
        {
            label: 'Last name',
            type: 'text',
            value: 'last_name'
        },
        {
          label: 'Username',
          type: 'text',
          value: 'user_name'
        },
        {
            label: 'Email',
            type: 'text',
            value: 'email'
        },
        {
          label: 'Password',
          type: 'password',
          value: 'password'
        }
      ]
    },
    {
      section: 2,
      items: [
        {
          label: 'City',
          type: 'text',
          value: 'city'
        },
        {
          label: 'State',
          type: 'select',
          value: 'state',
          options: [ 
            'AL : Alabama',
            'AK : Alaska',
            'AZ : Arizona',
            'AR : Arkansas',
            'CA : California',
            'CO : Colorado',
            'CT : Connecticut',
            'DE : Delaware',
            'FL : Florida',
            'GA : Georgia',
            'HI : Hawaii',
            'ID : Idaho',
            'IL : Illinois',
            'IN : Indiana',
            'IA : Iowa',
            'KS : Kansas',
            'KY : Kentucky',
            'LA : Louisiana',
            'ME : Maine',
            'MD : Maryland',
            'MA : Massachusetts',
            'MI : Michigan',
            'MN : Minnesota',
            'MS : Mississippi',
            'MO : Missouri',
            'MT : Montana',
            'NE : Nebraska',
            'NV : Nevada',
            'NH : New Hampshire',
            'NJ : New Jersey',
            'NM : New Mexico',
            'NY : New York',
            'NC : North Carolina',
            'ND : North Dakota',
            'OH : Ohio',
            'OK : Oklahoma',
            'OR : Oregon',
            'PA : Pennsylvania',
            'I : Rhode Island',
            'C : South Carolina',
            'D : South Dakota',
            'N : Tennessee',
            'X : Texas',
            'T : Utah',
            'T : Vermont',
            'VA : Virginia',
            'WA : Washington',
            'WV : West Virginia',
            'WI : Wisconsin',
            'WY : Wyoming']
        }
      ]
    },
    {
      section: 3,
      items: [
        {
          label: 'Placeholder to prompt user to indicate interests',
          type: 'information'
        }
      ]
    }
  ]