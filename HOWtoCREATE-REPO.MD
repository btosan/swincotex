1. <!-- THE FIRST THING IS TO DO THIS ON VSCODE BASH-->
git init
git add .
git commit -m "Initial commit"
git branch -M main

2. <!-- THE SECOND THING IS TO CREATE REPO ON GIT -->
Make sure:

Repo name: karis (as an example)
❌ Do NOT add README
❌ Do NOT add .gitignore

3. <!-- THE THIRD THING IS TO CONNECT THE REPO -->
git remote add origin https://github.com/btosan/swincotex.git
git remote -v

YOU SHOULD SEE origin https://github.com/btosan/swincotex.git

4. <!-- PUSH TO GIT -->
git push -u origin main