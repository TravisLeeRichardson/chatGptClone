require("dotenv").config();
const { ethers } = require("ethers");
const { Configuration, OpenAIApi } = require ("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const main = async () => {

   // Import the libraries and load the environment variables.
    const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk') ;
    require('dotenv').config()

    // Create Auth object
    const auth = new Auth({
        projectId: process.env.INFURA_API_KEY,
        secretId: process.env.INFURA_API_KEY_SECRET,
        privateKey: process.env.WALLET_PRIVATE_KEY,
        chainId: 1,
    });

// Instantiate SDK
const sdk = new SDK(auth);
const collectionId2 = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; //BAYC collection
 image = null;
 traits = null;

    const getNFTs = async (collectionId)=> {
        const nfts = await sdk.api.getNFTsForCollection({
            contractAddress: collectionId,
        });
        console.log('nfts:', nfts);
    }
    
    const getTokenMetadata = async (collectionId) => {
        const tokenMetadata = await sdk.api.getTokenMetadata({
            contractAddress: collectionId,
            tokenId: 5260,
        });
        image = JSON.stringify(tokenMetadata.metadata.image);
        traits = JSON.stringify(tokenMetadata.metadata.attributes);

        console.log (image);
        console.log(traits);
    }

    const getOpenAiStory = async (traits) => {
        const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: 'Create a story about this Bored Ape Yacht Club character based on these traits ${traits}',
        max_tokens: 200
    });
    console.log("++++++++++++++++++++");
    console.log(completion.data.choices[0].text);
    console.log("++++++++++++++++++++");
}

(async() => {
    try {
      const nfts = await getNFTs(collectionId2);
      const metadata = await getTokenMetadata(collectionId2);
      const AIStory = await getOpenAiStory(traits);
    } catch (error) {
      console.log(error);
    }
})();



}

  
  main();
  