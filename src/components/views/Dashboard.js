import React from "react";
import { Card, CardBody, Container, Nav, NavItem, NavLink } from "reactstrap";
import Header from "../Header";
import Products from "../Product/Products";


const Dashboard = () => {
    const [navPills, setNavPills] = React.useState("Movie");

    const activeClass = (index) => `mb-sm-3 mb-md-0 shadow-none ${navPills === index ? "active" : "text-danger"}`;

    return (
        <>
            <Header title="Dashboard" description="This is the dashboard page" />
            <Container className="mt--5">
                <Card className="shadow rounded">
                    <CardBody className="border-0">
                        <h1>Dashboard</h1>
                        <Nav className="nav-fill flex-column flex-sm-row" id="tabs-text" pills role="tablist" >
                            <NavItem>
                                <NavLink aria-selected={navPills === "Movie"} className={activeClass("Movie")} onClick={() => setNavPills("Movie")} href="#pablo" role="tab" >
                                    Movie
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink aria-selected={navPills === "Music"} className={activeClass("Music")} onClick={() => setNavPills("Music")} href="#pablo" role="tab" >
                                    Music
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink aria-selected={navPills === "Book"} className={activeClass("Book")} onClick={() => setNavPills("Book")} href="#pablo" role="tab" >
                                    Book
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink aria-selected={navPills === "Game"} className={activeClass("Game")} onClick={() => setNavPills("Game")} href="#pablo" role="tab" >
                                    Game
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink aria-selected={navPills === "Manga"} className={activeClass("Manga")} onClick={() => setNavPills("Manga")} href="#pablo" role="tab" >
                                    Manga
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink aria-selected={navPills === "Anime"} className={activeClass("Anime")} onClick={() => setNavPills("Anime")} href="#pablo" role="tab" >
                                    Anime
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </CardBody>
                </Card>

                <Card className="shadow rounded mt-5">
                    <CardBody className="border-0">
                        {navPills.length === 0 ? (<p className="mt-5 text-center">Chose your search selection</p>) : <Products type={navPills} admin={true}/>}
                        {/* 
                        {navPills.length === 0 ? (<p className="mt-5 text-center">Chose your search selection</p>) : null}
                        {navPills === "Movie" ? <Products lList={[]} type={navPills} /> : null}
                        {navPills === "Music" ? <Products lList={ } type={navPills} /> : null}
                        {navPills === "Game" ? <Products lList={games} type={navPills} /> : null}
                        {navPills === "Book" ? <Products lList={books} type={navPills} /> : null}
                        {navPills === "Manga" ? <Products lList={mangas} type={navPills} /> : null}
                        {navPills === "Anime" ? <Products lList={animes} type={navPills} /> : null}
                         */}
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default Dashboard;