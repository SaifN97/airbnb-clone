import { format } from 'date-fns'
import { useRouter } from 'next/dist/client/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

const Search = ({ searchResults }) => {
  const router = useRouter()
  const { location, startDate, endDate, numberOfGuests } = router.query

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div className="h-screen">
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} Guests`}
      />
      <main className="flex overflow-hidden">
        <section className="relative h-screen overflow-y-scroll px-6 pt-14">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} Guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Stays in {location}
          </h1>

          <div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        {/* //Map */}
        <section className="hidden h-screen overflow-hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Search

export const getServerSideProps = async (context) => {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}
