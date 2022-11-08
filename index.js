const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethreum)
}

const contractApi = (contractAddress, contractABI, signer) => {
    const MoodContract = new ethers.Contract(contractAddress, contractABI, signer)
    return {
        async getMood() {
           
            const mood = await MoodContract.getMood()
            
            return mood 
        },
        async setMood(mood) {
            console.log("Setting mood")
            await MoodContract.setMood(mood)
            console.log("Mood set done")
        }
    }
}
const init  = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const accounts = provider.listAccounts()
    const signer = provider.getSigner(accounts[0])
    console.log("Signer", signer)
    const contractAddress = address
    const contractABI = [
        {
            "inputs": [],
            "name": "getMood",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_mood",
                    "type": "string"
                }
            ],
            "name": "setMood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const contractApiObj = contractApi(contractAddress, contractABI, signer)
    console.log("CONTRACT_API_OBJ", contractApiObj)
    const d1 = document.getElementById('d1')
    document.getElementById('b1').onclick = async () => {
        if (document.getElementById('t1').value.trim() !== "") {
            console.log("SETTING_MOOOD")
            await contractApiObj.setMood(document.getElementById('t1').value)
        }
    }
    document.getElementById('b2').onclick = async () => {
        const mood = await contractApiObj.getMood()
        console.log("Mood", mood)
        d1.innerHTML = mood 
        d1.style.textAlign = "center"
        d1.style.background = "green"
        d1.style.width = "100px"
        d1.style.height = "100px"
    }
}

init(localStorage.getItem('contract_address'))
