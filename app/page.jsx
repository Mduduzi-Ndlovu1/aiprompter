import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text">
            Discover & Share 
            <br  className="max-md:hidden"/>
            <span className="orange_gradient">AI-Powered Prompts</span>

        </h1>
        <p className="desc text-center">
            This is a an open-source AI Prompting tool for modern world discovery, creation and sharing creative prompts.
        </p>
        <Feed/>
    </section>
  )
}

export default Home