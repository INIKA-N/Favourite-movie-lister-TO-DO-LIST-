import { useState } from "react";
import "./ParentComp.css";

function ParentComp() {
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState({
        name: "",
        genre: "",
        year: ""
    });
    const [editIndex, setEditIndex] = useState(-1);
    const [editDetails, setEditDetails] = useState({
        name: "",
        genre: "",
        year: ""
    });

    function handleClick() {
        if (movieDetails.name && movieDetails.genre && movieDetails.year) {
            setMovies([...movies, movieDetails]);
            setMovieDetails({ name: "", genre: "", year: "" });
        }
    }

    function handleDeleteItems(idx) {
        const updatedMovies = movies.filter((_, index) => index !== idx);
        setMovies(updatedMovies);
    }

    function handleEditItems(idx) {
        setEditIndex(idx);
        setEditDetails(movies[idx]);
    }

    function handleSaveEdit(idx) {
        const updatedMovies = [...movies];
        updatedMovies[idx] = editDetails;
        setMovies(updatedMovies);
        setEditIndex(-1);
        setEditDetails({ name: "", genre: "", year: "" });
    }

    function handleCancelEdit() {
        setEditIndex(-1);
        setEditDetails({ name: "", genre: "", year: "" });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMovieDetails({ ...movieDetails, [name]: value });
    }

    function handleEditChange(event) {
        const { name, value } = event.target;
        setEditDetails({ ...editDetails, [name]: value });
    }

    return (
        <div className="parent-comp">
            <label>Favorite Movies:</label>
            <input
                type="text"
                name="name"
                value={movieDetails.name}
                onChange={handleChange}
                placeholder="Enter movie name"
            />
            <input
                type="text"
                name="genre"
                value={movieDetails.genre}
                onChange={handleChange}
                placeholder="Enter movie genre"
            />
            <input
                type="text"
                name="year"
                value={movieDetails.year}
                onChange={handleChange}
                placeholder="Enter release year"
            />
            <button onClick={handleClick}>Add</button>
            <ol>
                {movies.map((movie, index) => (
                    <div key={index} className="movie-item">
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editDetails.name}
                                    onChange={handleEditChange}
                                    placeholder="Enter movie name"
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    value={editDetails.genre}
                                    onChange={handleEditChange}
                                    placeholder="Enter movie genre"
                                />
                                <input
                                    type="text"
                                    name="year"
                                    value={editDetails.year}
                                    onChange={handleEditChange}
                                    placeholder="Enter release year"
                                />
                                <button onClick={() => handleSaveEdit(index)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <li>{movie.name} - {movie.genre} ({movie.year})</li>
                                <button onClick={() => handleDeleteItems(index)}>Delete</button>
                                <button onClick={() => handleEditItems(index)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </ol>
        </div>
    );
}

export default ParentComp;
