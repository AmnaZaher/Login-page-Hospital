git add .
git commit -m "Inject strict default passwords for identity system"
git checkout main
git merge new-doctor -m "Auto merge" --no-edit
git push origin main
git checkout new-doctor
