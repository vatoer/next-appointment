# git

## git - Reset local repository branch to be just like remote repository

```sh
git fetch origin
git reset --hard origin/master
```

To delete a Git branch both locally and remotely, you can follow these steps:

Delete the local branch by running the following command in your terminal:

```sh
git branch -d branch_name
```

If the branch is not fully merged, you can use -D option which is a shortcut for `--delete --force`.

```sh
git branch -D branch_name
```

Delete the remote branch by pushing the deletion to the remote repository:

```sh
git push origin --delete branch_name
```

Please replace branch_name with your actual branch name and origin with your remote name if it's different.
