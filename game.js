const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode (textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption (option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id : 1,
        text: 'You wake up in a strange place and see a jar of blue goo near you.',
        options : [
            {
                text: ' Take goo',
                setState: { blueGoo : true},
                nextText:2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo : false, sword: true},
            nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo : false, shield: true},
            nextText: 3
            },
            {
                text: 'Ignore the merchant',
            nextText: 3
            },
        ]
    },
    {
        id :3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'You are so tired while exploring the castle that you fall asleep and are killed by the monster that lives there in your sleep',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    },
    {
        id: 5,
        text: 'You enter the town and find an inn but you have no money to pay for the room',
        options: [
            {
                text: 'Trade the goo for a room',
                requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo : false, room: true},
            nextText: 7
            },
            {
                text: 'Sleep outside in the cold',
                nextText: 8
            },
        ]
    },
    {
        id :6,
        text: 'You sleep in the filthy stable with animal decay and thin hay.You wake up the next morning and see the owner approaching you with a pitchfork ',
        options: [
            {
                text: 'Run ',
                nextText: 9
            },
            {
                text: 'Explain your situation to him',
                nextText: 10
            },
            {
                text: 'Rob him for what he has',
                nextText: 11
            },
        ]
    },
    {
        id: 7,
        text: 'The owner gives you a room to sleep in and you settle in for the night',
        options: [
            {
                text: ' Fall asleep on the bed',
                nextText: 12
            },
        ]
    },
    {
        id: 8,
        text: 'The weather is below freezing and you die of hypothermia',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    },
    {
        id: 9,
        text: 'You are still weak and he catches up to you and stabs you with his pitchfork',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    },
    {
        id: 10,
        text: 'He doesnt listen and stabs you',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    },
    {
        id:11,
        text: 'You lunge at him and search him but he has nothing and shouts for others to help him. The villagers come and take you to the king',
        options: [
            {
            text: 'Fight them',
            nextText: 13
            },
            {
                text: 'Go with them',
                nextText:14
            }
        ]
    },
    {
        id:12,
        text: 'You wake up back in your own bed. You did not solve the mystery.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            },
        ]
    }
  
]

startGame()