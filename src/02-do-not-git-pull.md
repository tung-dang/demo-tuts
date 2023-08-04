# Do not do `git pull`

## Why should we not pull branches of other people?

- Calling `git pull` or `git fetch` without any extra parameters will try to fetch and load the content of all remote branches from the remote server.
- Why?
- Should:

```bash
# main branch
git fetch origin master --prune --prune-tags
git rebase origin/master
```

```bash
# development branch
git fetch origin issue/ticket-xxx --prune --prune-tags
# first time
git check-out issue/ticket-xxx
# not first time
git check-out issue/ticket-xxx
git rebase origin issue/ticket-xxx
```

Tip: To avoid using `--prune --prune-tags` options, we can update `~/.gitconfig` file to add these options

```bash
[fetch]
  prune = true
  pruneTags = true
```

-------------------------------------------------------------------------------------------------

## Shortcut in `~/.gitconfig`

```bash
[alias]
  fetch-main-br = fetch origin master
  rebase-main-br = rebase origin/master
```

```bash

# Enable automatic pruning for all your repos
git config --global fetch.prune true
git config --global fetch.pruneTags true

# Enable if you use a git GUI
git config --global gui.pruneDuringFetch true
```

-------------------------------------------------------------------------------------------------

## Tip: check out branch and get the latest update

```bash
g_co() {
  BRANCH_NAME="$1"

  echo " - Start fetching from origin $1"
  git fetch origin $BRANCH_NAME

  if [ -n "$(git branch --list $BRANCH_NAME)" ]; then
    echo " - The branch $BRANCH_NAME was in local so starting to fetch the latest update for the branch."
    git checkout $BRANCH_NAME
    git rebase -n "origin/$BRANCH_NAME"
    # git merge -n "origin/$BRANCH_NAME"
  else
    git checkout $BRANCH_NAME
  fi

  echo " - Error status: "$?;
  git status
}
```

-------------------------------------------------------------------------------------------------
## Clean up unused local branch references

- 1. Get size of `.git` folder: `du -sh .git`
- 2. Get local branch ref of the main branch:

```bash
git rev-parse --quiet origin/master
# returning example: 3c71203c72e7dca7d177fb45b6b312b9f404e4d6
```

- 3. Remove all local unused branch refs

```bash
git branch -r \
   --no-contains  3c71203c72e7dca7d177fb45b6b312b9f404e4d6 \
   | xargs -I{} git branch -rd "{}"
```

- 4. Gargce Collector:  `git gc --prune=now`. [Document](https://git-scm.com/docs/git-gc)
- 5. Get size of `.git` folder: again: `du -sh .git`
