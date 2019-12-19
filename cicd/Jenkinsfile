on_pull_request to: develop, {
  unit_test()
  npm_audit()
  static_dependency_check_analysis()
  static_code_analysis()
  build()
}

on_merge to: develop, {
  build()
  deploy_to Dev
}

on_merge to: test, {
  deploy_to Test 
}

on_merge to: master, {
  deploy_to Prod 
}