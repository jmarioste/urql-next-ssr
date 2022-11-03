import type { GetServerSideProps, NextPage } from "next";
import {
  EpisodesDocument,
  EpisodesQuery,
  EpisodesQueryVariables,
  useEpisodesQuery,
} from "../graphql/episodes.gql";
import { initUrqlClient } from "../urql/initUrqlClient";

const Home: NextPage = () => {
  const [{ data }] = useEpisodesQuery({
    variables: {
      page: 1,
    },
  });

  const episodes = data?.episodes?.results;
  return (
    <div className="container">
      <ol className="episode-list">
        {episodes?.map((episode, i) => {
          return (
            <li key={i} className="episode">
              <h2 className="episode-title">{episode?.name}</h2>
              <p className="episode-ep">{episode?.episode}</p>
              <time dateTime={episode?.air_date ?? ""}>
                {episode?.air_date}
              </time>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { ssrCache, urqlClient } = initUrqlClient(
    "https://rickandmortyapi.com/graphql"
  );

  //call episodes query here
  const results = await urqlClient
    .query<EpisodesQuery, EpisodesQueryVariables>(EpisodesDocument, {
      page: 1,
    })
    .toPromise();

  if (results.error) {
    throw new Error(results.error.message);
  }

  return {
    props: {
      //just extract the ssrCache to pass the data to props
      URQL_DATA: ssrCache?.extractData(),
    },
  };
};
