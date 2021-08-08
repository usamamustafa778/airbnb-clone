import Head from 'next/head'
import Header from "../Components/Header";
import Footer from '../Components/Footer'
import { useRouter } from "next/dist/client/router";
import {format} from "date-fns";
import InfoCard from "../Components/InfoCard";

function Search({searchResults}) {

    const router = useRouter();
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formattedStartDate = format(new Date(), "dd MMM yy");
    const formattedEndDate = format(new Date(), "dd MMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div className="h-screen">
            <Head>
                <title>Airbnb Clone</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header
                placeholder={`${location} | ${range} | ${noOfGuests}}`}
            />

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="flex">300+ stays from - 
                        <p className="px-2 rounded-lg ml-2 mr-2 bg-red-400 text-white">{formattedStartDate}</p> 
                        to 
                        <p className="px-2 rounded-lg ml-2 mr-2 bg-red-400 text-white">{formattedEndDate}</p> 
                        - for {noOfGuests} guests.
                    </p>
                    <h1 className="text-4xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Felxibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col">
                    {searchResults?.map(({img, location, title, description, star, price, total}) => (
                        <InfoCard
                            key = {img}
                            img = {img}
                            location = { location }
                            title = { title }
                            description = { description}
                            star = { star }
                            price = { price }
                            total = { total }
                        />
                    ))}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSidePorps(){
    const searchResults = await fetch("https://links.papareact.com/isz")
        .then(
            (res) => res.json()
        );

    return {
        props:{
            searchResults,
        },
    };
}