// import styles from '@styles/Home.module.css'
// import Layout from '@components/layouts/Layout'
import Header from '@components/sections/Header'
import Home2 from '@components/sections/Home'
import About from '@components/sections/AboutNew'
import Skills from '@components/sections/Skills'
// import CollaboratedWith from '@components/hooks/CollaboratedWith'
// import About from '@components/sections/About'
// import Hero from '@components/sections/Hero'
// import Featured from '@components/sections/Features'
// import Contact from '@components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <Home2 />
      <About />
      <Skills />
    </>
    // <div className={styles.container}>
    //   <Layout>
    //     <Hero />
    //     <About />
    //     <Featured />
    //     <CollaboratedWith />
    //     <Contact />
    //   </Layout>
    // </div>
  )
}
