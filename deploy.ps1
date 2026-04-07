Remove-Item -Path ".git\.MERGE_MSG.swp" -Force -ErrorAction SilentlyContinue 
git merge --abort
git checkout new-doctor
git add .
git commit -m "Deploy build fix"
git checkout main
git merge new-doctor -m "Auto Merge branch" --no-edit
git push origin main
git checkout new-doctor
