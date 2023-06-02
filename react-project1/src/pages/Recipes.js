import React, { useState, useEffect, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Form } from 'react-bootstrap';
import { RecipesContext } from '../App.js';
import Category from '../components/Category';
import FindCards from '../components/FindCards';

function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredPosts = recipes.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setSearchResults(filteredPosts);
    setCurrentPage(1);
    setSearchTerm('');
  };

  useEffect(() => {
    setFilteredRecipes(searchResults.length > 0 ? searchResults : recipes);
  }, [searchResults, recipes]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredRecipes.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRecipes.length / postsPerPage);

  return (
    <div className="align">
      <div>
        <Form
          className="d-flex"
          onSubmit={handleSearch}
          style={{ width: '70%', height: '60px', margin: '0 auto', marginTop: '-30px' }}
        >
          <Form.Control
            type="search"
            placeholder="레시피를 검색해보세요."
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Button variant="outline-warning" type="submit" style={{ width: '10%' }}>
            <SearchIcon style={{ justifyContent: 'center' }} />
          </Button>
        </Form>
      </div>

      <Category setFilteredRecipes={setFilteredRecipes} />

      <div>
        <div className="row">
          {currentPosts.map((item) => (
            <FindCards key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px' }}></div>
      <ul className="pagination" style={{ justifyContent: 'center' }}>
        <li className="page-item">
          <p
            className="page-link"
            aria-label="Previous"
            style={{ color: 'black' }}
            onClick={() => (1 < currentPage ? setCurrentPage(currentPage - 1) : setCurrentPage(1))}
          >
            <span aria-hidden="true">&laquo;</span>
          </p>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li className="page-item" key={index}>
            <p
              className={`page-link${index + 1 === currentPage ? ' active' : ''}`}
              style={{ color: 'black' }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </p>
          </li>
        ))}
        <li className="page-item">
          <p
            className="page-link"
            aria-label="Next"
            style={{ color: 'black' }}
            onClick={() => (currentPage < totalPages ? setCurrentPage(currentPage + 1) : setCurrentPage(totalPages))}
          >
            <span aria-hidden="true">&raquo;</span>
          </p>
        </li>
      </ul>
      <div style={{ marginTop: '30px' }}></div>
    </div>
  );
}

export default Recipes;