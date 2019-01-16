import request from 'apis/common'
/**
 * searh repos by name
 * @param name username
 */
export const loadReposByUserName = (name: string) =>
  request({
    url: `users/${name}/repos`,
  })
