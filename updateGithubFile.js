const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const REPO_PATH = "C:/Users/mlakier/entity-management-backend"; // Change this to your actual repo path
const COMMIT_MESSAGE = "Automated update of all modified files";

async function updateGitHubFiles() {
    const git = simpleGit(REPO_PATH);

    try {
        // 1️⃣ Pull latest changes
        console.log("🔄 Pulling latest changes...");
        await git.pull();

        // 2️⃣ Modify a file (Optional - if you need to update something automatically)
        console.log("✏️ Checking for changes...");
        fs.writeFileSync(path.join(REPO_PATH, "last-updated.txt"), `Updated on: ${new Date().toISOString()}\n`, { flag: 'w' });

        // 3️⃣ Stage all modified and untrackedfiles
        console.log("📌 Staging all modified and untracked files...");
        await git.add("--all");  // ✅ Includes all modified and untracked files

        // 4️⃣ Commit the changes
        console.log("📝 Committing changes...");
        await git.commit(COMMIT_MESSAGE);

        // 5️⃣ Push to GitHub
        console.log("🚀 Pushing to GitHub...");
        await git.push();

        console.log("✅ All files updated successfully!");

    } catch (error) {
        console.error("❌ Error updating files:", error);
    }
}

// Run the function
updateGitHubFiles();
