import React from 'react'
import { Layout } from '@/app/components/layouts/Layout'
const layout = ({children}) => {
  return (
    <Layout pageTitle="Hola">{children}</Layout>
  )
}

export default layout
