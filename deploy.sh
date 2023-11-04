#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

dist_path=docs/.vuepress/dist # 打包生成的文件夹路径
deploy_branch=master # 推送的分支
user_name=huidongyin
user_email=huidong.yin247203@gmail.com

# 生成静态文件
npm run build

# 进入生成的文件夹
cd $dist_path


if [ -z "$GITHUB_TOKEN" ]; then  # -z 字符串 长度为0则为true；$GITHUB_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  msg='deploy'
  githubUrl=git@github.com:huidongyin/huidongyin.github.io.git
else
  msg='Action workflow deploy'
  githubUrl=git@github.com:huidongyin/huidongyin.github.io.git
fi
git init
git config user.name $user_name
git config user.email $user_email
git add -A
git commit -m "${msg}"
git push -f $githubUrl main:$deploy_branch # 推送到github

cd -
rm -rf $dist_path