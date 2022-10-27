import { ethers } from "hardhat";


const daoId = "test2";
const projectId = "test2";
const daoHistoryAddress = "0xBfDe11DDAB2c81e72d43872Fe3Ed1e47d54C1A75"

async function main() {
    const daoHistory = await ethers.getContractAt("DAOHistory", daoHistoryAddress);

    const daoName = "Chen's DAO";
    const daoDescription = "I love it.";
    const website = ""
    const logo = "https://pbs.twimg.com/profile_images/1573337831023398912/9n_sTKRu_400x400.jpg"

    await daoHistory.addDao(daoId, projectId, daoName, daoDescription, website, logo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
