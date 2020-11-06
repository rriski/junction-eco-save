import React from 'react'

import { useRouter, BlitzPage } from 'blitz'

import { SignupForm } from 'app/auth/components/SignupForm'
import Layout from 'app/layouts/Layout'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push('/')} />
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
