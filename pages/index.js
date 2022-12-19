import { useState } from 'react'

import Button from '../components/Button'
import Container from '../components/Container'
import Grid from '../components/Grid'
import Filters from '../components/Filters'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import Showcase from '../components/Showcase'

import { getAllRestaurants, getAllRestaurantTypes } from '../lib/api'

export async function getStaticProps() {
  const restaurants = await getAllRestaurants();
  const restaurantTypes = await getAllRestaurantTypes();
  return {
    props: {
      restaurants,
      restaurantTypes
    },
  }
}

const HomePage = ({ restaurants, restaurantTypes }) => {  
  const [activeCategory, setActiveCategory] = useState("All")
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeCategory === "All") {
      return restaurant;
    }
    if (restaurant.node.restaurantTypes.edges.length > 0) {
      return restaurant.node.restaurantTypes.edges[0].node.name === activeCategory ? restaurant : false;
    }
  }); 
  return <Layout>
    <Showcase
      title="A guide to the best eating spots in Syracuse."
      description="With hundreds of restaurants located within the 315, there really is a little something for all tastes."
      cta="View Restaurants"
    />
    <section>
      <Container>
        <Filters 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={restaurantTypes}
        />
        <Grid data={filteredRestaurants} />
      </Container>
    </section>
  </Layout>
}
export default HomePage 