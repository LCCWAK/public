var isFiltersOpen = false;

// RESIZE MENU AFTER SCROLLING
// RESIZE FILTERS AFTER SCROLLING
window.addEventListener("scroll", scrollResize);

function scrollResize(){
  const menuHolder = document.getElementById("menuHolder");
  const filtersHolder = document.getElementById("filtersHolder");
  const logo = document.getElementById("menuLogo");
  const logoHolder = document.getElementById("menuLogoHolder");
  const searchHolder = document.getElementById("menuSearchHolder");
  const about = document.getElementById("menuAboutButton");
  const filtersContentsHolder = document.getElementById("filtersContentsHolder")
  const filtersContents = document.getElementById("filtersContents")

  if (window.scrollY > 10){
    menuHolder.style.height = "80px";
    filtersHolder.style.top = "80px";
    logo.style.height = "60px";
    logo.style.width = "60px";
    logoHolder.style.margin = "10px 20px 0 40px";
    searchHolder.style.padding = "20px";
    about.style.margin = "20px 20px 0 0";
    if (isFiltersOpen == true){
      var filtersHolderHeight = document.documentElement.clientHeight - 45;
      var filtersContentsHolderHeight = document.documentElement.clientHeight - 123;
      var filtersContentsHeight = document.documentElement.clientHeight - 131;
      filtersHolder.style.height = filtersHolderHeight + "px";
      filtersContentsHolder.style.height = filtersContentsHolderHeight + "px";
      filtersContents.style.height = filtersContentsHeight + "px";
    }
  }else{
    menuHolder.style.height = "100px";
    filtersHolder.style.top = "100px";
    logo.style.height = "80px";
    logo.style.width = "80px";
    logoHolder.style.margin = "8px 30px 0 30px";
    searchHolder.style.padding = "30px 0 30px 0";
    about.style.margin = "30px 20px 0 0";
    if (isFiltersOpen == true){
      var filtersHolderHeight = document.documentElement.clientHeight - 65;
      var filtersContentsHolderHeight = document.documentElement.clientHeight - 143;
      var filtersContentsHeight = document.documentElement.clientHeight - 151;
      filtersHolder.style.height = filtersHolderHeight + "px";
      filtersContentsHolder.style.height = filtersContentsHolderHeight + "px";
      filtersContents.style.height = filtersContentsHeight + "px";
    }
  }
}

// RESIZE SEARCHBAR BASED ON SCREEN WIDTH
// HIDE FILTERS WHILE RESIZING
window.addEventListener("resize", resizeResize);

function resizeResize(){
  const searchbar = document.getElementById("menuSearchbar");
  const sidebody2 = document.getElementById("sideBody2");
  const recipieLeft = document.getElementById("recipieLeft");
  if (document.documentElement.clientWidth > 1300){
    searchbar.style.width = "1000px";
    sidebody2.style.left = "1080px";
    recipieLeft.style.width = "880px";
  }else{
    var newWidth = document.documentElement.clientWidth - 300;
    var newLeft = document.documentElement.clientWidth - 175;
    var newLeft2 = document.documentElement.clientWidth - 420;
    searchbar.style.width = newWidth + "px";
    sidebody2.style.left = newLeft + "px";
    recipieLeft.style.width = newLeft2 + "px";
    console.log("eloo");
  }

  hideAllSearchResults(event)
  showFiltersFalse();
}


// SHOW OR HIDE FILTERS AFTER CLICKING THE BUTTON
function showFilters(){
  if (isFiltersOpen){
    showFiltersFalse();
  }else{
    showFiltersTrue();
  }
}


// SHOW FILTERS
function showFiltersTrue(){
  const filtersHolder = document.getElementById("filtersHolder")
  const filtersContentsHolder = document.getElementById("filtersContentsHolder")
  const filtersContents = document.getElementById("filtersContents")

  var filtersHolderHeight = document.documentElement.clientHeight - 75;
  var filtersContentsHolderHeight = document.documentElement.clientHeight - 143;
  var filtersContentsHeight = document.documentElement.clientHeight - 151;
  filtersHolder.style.height = filtersHolderHeight + "px";
  filtersContentsHolder.style.height = filtersContentsHolderHeight + "px";
  filtersContents.style.height = filtersContentsHeight + "px";
  document.getElementById("filtersContents").scrollTop = 0;
  isFiltersOpen = true;
}

// HIDE FILTERS
function showFiltersFalse(){
  const filtersHolder = document.getElementById("filtersHolder")
  const filtersContentsHolder = document.getElementById("filtersContentsHolder")
  const filtersContents = document.getElementById("filtersContents")

  filtersHolder.style.height = "51px";
  filtersContentsHolder.style.height = "0px";
  isFiltersOpen = false;
}


// SHOW FILTERS SEARCH RESULTS
function showSearchResults(event, name)
{
  hideAllSearchResults(event)
	document.getElementById(name + "SearchResults").style.display = "block";
  document.getElementById(name + "SearchResults").scrollTop = 0;
  event.stopPropagation();
}


// HIDE FILTERS SEARCH RESULTS
function hideSearchResults(event, name)
{
	document.getElementById(name + "SearchResults").style.display = "none";
}


// HIDE ALL FILTERS SEARCH RESULTS
function hideAllSearchResults(event){
  document.getElementById("ingredientsSearchResults").style.display = "none";
  document.getElementById("allergensSearchResults").style.display = "none";
  document.getElementById("tagsSearchResults").style.display = "none";
}
