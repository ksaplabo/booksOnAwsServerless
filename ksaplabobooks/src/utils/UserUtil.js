import * as AwsUtil from './AwsUtil';

export function signUp(email, password, yourname) {
  return AwsUtil.signUp(email, password, yourname);
}

export function signUpConfirm(username, verifyKey) {
  return AwsUtil.signUpConfirm(username,  verifyKey);
}

export function signIn(email, password) {
  return AwsUtil.signIn(email, password);
}

export function signOut() {
  return AwsUtil.signOut();
}

export function currentUserInfo() {
  return AwsUtil.currentUserInfo();
}

export function currentSession() {
  return AwsUtil.currentSession();
   
}
