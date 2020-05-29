export default function Nav() {
  return (
    <nav className="flex justify-between">
      <div>
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="main-logo pull-left" href="/">
          <img className="img-responsive" width="50" src="/datahub-cube.svg" />
        </a>
      </div>
      <div className="collapse navbar-collapse" id="myNavbar" >
        <ul className="flex uppercase text-sm pt-10">
          <li className="pr-12">
            <a href="/about">About</a>
          </li>
          <li className="pr-12">
            <a href="/news">News</a>
          </li>
          <li className="pr-12">
            <a href="/search" className="text-orange-500 join-link">Find data</a>
          </li>
          <li className="pr-12">
            <a href="/collections">Collections</a>
          </li>
          <li className="pr-12">
            <a href="/requests">Requests</a>
          </li>
          <li className="pr-12">
            <a href="/docs">Docs</a>
          </li>
          <li className="pr-12">
            <a href="/pricing">Pricing</a>
          </li>
          <li className="pr-12">
            <a href="/download">Tools</a>
          </li>
          <li className="pr-12">
            <a href="https://gitter.im/datahubio/chat" className="chat" target="_blank">Chat</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
