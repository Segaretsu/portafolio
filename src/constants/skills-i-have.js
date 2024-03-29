import moment from "moment";

const yearsWorkAsBackendDeveloper = moment().diff(new Date(2017, 7, 20), 'years');
const yearsWorkAsFrontendDeveloper = moment().diff(new Date(2017, 12, 20), 'years');

const yearsDevelopingSoftSkills = moment().diff(new Date(2015, 1, 1), 'years');


const abilities = [
    {
        title: 'Backend developer',
        subtitle: `More than ${yearsWorkAsBackendDeveloper} years`,
        icon: 'uil-server-network-alt',
        skills: [
            {
                name: 'Java',
                percentage: '80%',
            },
            {
                name: 'Node.js',
                percentage: '70%',
            },
            {
                name: 'Express.js',
                percentage: '70%',
            },
            {
                name: 'Oracle',
                percentage: '50%',
            },
            {
                name: 'Mongodb',
                percentage: '60%',
            },
        ],
    },
    {
        title: 'Frontend developer',
        subtitle: `More than ${yearsWorkAsFrontendDeveloper} years`,
        icon: 'uil-brackets-curly',
        skills: [
            {
                name: 'JavaScript',
                percentage: '85%',
            },
            {
                name: 'React.js',
                percentage: '75%',
            },
            {
                name: 'Angular.js',
                percentage: '60%',
            },
            {
                name: 'CSS',
                percentage: '50%',
            },
        ],
    },
    {
        title: 'Automation developer',
        subtitle: 'More than 2 years',
        icon: 'uil-robot',
        skills: [
            {
                name: 'Automation testing',
                percentage: '80%',
            },
            {
                name: 'Katalon Studio',
                percentage: '70%'
            },
            {
                name: 'Selenium',
                percentage: '50%'
            },
        ]
    },
    {
        title: 'Internet of things developer',
        subtitle: 'More than 1 years',
        icon: 'uil-intercom-alt',
        skills: [
            {
                name: 'Python',
                percentage: '60%',
            },
            {
                name: 'Raspberry pi',
                percentage: '50%',
            },
            {
                name: 'C++',
                percentage: '30%',
            },
            {
                name: 'Arduino',
                percentage: '30%',
            },
        ],
    },
    {
        title: 'Soft skills',
        subtitle: `More than ${yearsDevelopingSoftSkills} years`,
        icon: 'uil-heart-medical',
        skills: [
            {
                name: 'Teamwork',
                percentage: '90%'
            },
            {
                name: 'Leadership',
                percentage: '80%',
            },
            {
                name: 'Teach',
                percentage: '80%'
            },
            {
                name: 'Conflict resolution',
                percentage: '80%'
            },
        ],
    },
]
export default abilities