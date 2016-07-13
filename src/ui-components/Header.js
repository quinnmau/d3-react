import ContactPane from './ContactPane';
import SearchBar from './SearchBar';
import React from 'react';

const Header = () =>
  <div className="the-head container">
    <ContactPane className="col-lg-6"/>
    <SearchBar className="col-lg-6"/>
  </div>

export default Header;
