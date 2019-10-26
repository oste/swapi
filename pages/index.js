import Layout from "../components/layout";

import { useDispatch, useSelector } from "react-redux";

import TextField, { HelperText, Input } from "@material/react-text-field";
// import LinearProgress from '@material/react-linear-progress';
// there is a an issue with the official LinearProgress,
// where it flashes on load so using rmwc version for now
import { LinearProgress } from "@rmwc/linear-progress";
import Select, { Option } from "@material/react-select";
import Button from "@material/react-button";
import { Snackbar } from "@material/react-snackbar";

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableBody,
  DataTableCell
} from "@rmwc/data-table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamation } from "@fortawesome/free-solid-svg-icons";

import { of, Subject } from "rxjs";
import { StateObservable } from "redux-observable";

import { peopleEpic } from "../epics/peopleEpic";
import { loadPeople, loadPeopleError, searchChange, sort } from "../actions/peopleActions";

import Species from "../components/species";

const Index = () => {
  const dispatch = useDispatch();


  const people = useSelector(state => state.peopleReducer.people);
  const species = useSelector(state => state.speciesReducer.species);
  const loading = useSelector(state => state.peopleReducer.loading);
  const inputValue = useSelector(state => state.peopleReducer.search);
  const error = useSelector(state => {
    if (state.peopleReducer.error) {
      return state.peopleReducer.error;
    }
    if (state.speciesReducer.error) {
      return state.speciesReducer.error;
    }
  });

  const sortBy = useSelector(state => state.peopleReducer.sort_by);
  const sortOrder = useSelector(state => state.peopleReducer.sort_order);

  const submit = evt => {
    evt.preventDefault();
    dispatch(loadPeople());
  };

  const input = value => {
    dispatch(searchChange(value));
  };

  const setSort = (newSortBy, newSortOrder, newSortType) => {
    dispatch(sort(newSortBy, newSortOrder, newSortType));
  };

  return (
    <Layout>
      <form className="form-container" onSubmit={evt => submit(evt)}>
        <div className="controls">
          <TextField label="Search">
            <Input
              value={inputValue}
              onChange={e => input(e.currentTarget.value)}
            />
          </TextField>

          <Button unelevated type="submit">
            Submit
          </Button>
        </div>
      </form>

      <LinearProgress closed={!loading} />

      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell
                sort={sortBy === "name" ? sortOrder : null}
                onSortChange={sortOrder => {
                  setSort("name", sortOrder);
                }}
              >
                Name
              </DataTableHeadCell>
              <DataTableHeadCell
                sort={sortBy === "height" ? sortOrder : null}
                onSortChange={sortOrder => {
                  setSort("height", sortOrder, 'number');
                }}
              >
                Height
              </DataTableHeadCell>
              <DataTableHeadCell
                sort={sortBy === "mass" ? sortOrder : null}
                onSortChange={sortOrder => {
                  setSort("mass", sortOrder, 'number');
                }}
              >
                Mass
              </DataTableHeadCell>
              <DataTableHeadCell
                sort={sortBy === "gender" ? sortOrder : null}
                onSortChange={sortOrder => {
                  setSort("gender", sortOrder);
                }}
              >
                Gender
              </DataTableHeadCell>
              <DataTableHeadCell
                sort={sortBy === "species" ? sortOrder : null}
                onSortChange={sortOrder => {
                  setSort("species", sortOrder);
                }}
              >
                Species
              </DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {people.length ? (
              people.map((person, index) => {
                return (
                  <DataTableRow key={index}>
                    <DataTableCell>{person.name}</DataTableCell>
                    <DataTableCell>{person.height}</DataTableCell>
                    <DataTableCell>{person.mass}</DataTableCell>
                    <DataTableCell>{person.gender}</DataTableCell>
                    <DataTableCell>
                      <Species species={species[person.species]} />
                    </DataTableCell>
                  </DataTableRow>
                );
              })
            ) : (
              <DataTableRow>
                <DataTableCell colSpan="5" alignMiddle className="info-cell">
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faExclamation} /> No people to
                      display
                    </>
                  )}
                </DataTableCell>
              </DataTableRow>
            )}
          </DataTableBody>
        </DataTableContent>
      </DataTable>

      {error ? (
        <Snackbar
          message={'There was an error please try again'}
          onClose={() => dispatch(loadPeopleError(null))}
          actionText="dismiss"
        />
      ) : null}
    </Layout>
  );
};

Index.getInitialProps = async ({ reduxStore, isServer }) => {
  const state$ = new StateObservable(new Subject(), reduxStore.getState());

  const resultAction = await peopleEpic(of(loadPeople()), state$).toPromise();

  reduxStore.dispatch(resultAction);

  return { isServer };
};

export default Index;
