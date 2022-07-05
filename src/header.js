import { BrowserRouter, Route, Link } from 'react-router-dom';

const Header = () => {
    return (
        <BrowserRouter>
            <div className='title'>
                <h1>Stranger's Things</h1>
            </div>
            <nav className='nav'>
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/login">LOGIN</Link>
                {/* <Switch>
                    <Route>

                    </Route>
                </Switch> */}
            </nav>
        </BrowserRouter>
    )
}

export default Header;