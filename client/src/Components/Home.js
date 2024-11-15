// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Home() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [user, setUser] = useState(location.state?.user);
//     const [loading, setLoading] = useState(!user);

//     useEffect(() => {
//         if (!user) {
//             axios.get('http://localhost:3001/user', { withCredentials: true })
//                 .then(response => {
//                     if (response.data.user) {
//                         setUser(response.data.user);
//                     } else {
//                         navigate("/login");
//                     }
//                 })
//                 .catch(() => navigate("/login"))
//                 .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, [user, navigate]);

//     if (loading) {
//         return <center><h1>Loading...</h1></center>;
//     }

//     return (
//         <center>
//             <h1 style={{color:"white", fontSize:"5rem"}}>Welcome Home {user && user.name} !!!</h1>
//         </center>
//     );
// }

// export default Home;


// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// function Home() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cars, setCars] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingCar, setEditingCar] = useState(null);

//   // Form States
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");
//   const [images, setImages] = useState([]);

//   const styles = {
//     container: { padding: "20px", color: "white" },
//     card: { margin: "10px", backgroundColor: "#333", color: "white" },
//     form: {
//       margin: "20px auto",
//       padding: "20px",
//       backgroundColor: "#444",
//       borderRadius: "8px",
//       maxWidth: "600px",
//       color: "white",
//     },
//     buttonGroup: { marginTop: "10px", display: "flex", gap: "10px" },
//   };

//   useEffect(() => {
//     // Fetch user and cars
//     axios
//       .get("http://localhost:3001/user", { withCredentials: true })
//       .then((response) => {
//         if (response.data.user) {
//           setUser(response.data.user);
//           fetchCars();
//         } else {
//           alert("Please log in");
//         }
//       })
//       .catch(() => alert("Error fetching user data"))
//       .finally(() => setLoading(false));
//   }, []);

//   const fetchCars = () => {
//     axios
//       .get("http://localhost:3001/cars", { withCredentials: true })
//       .then((response) => setCars(response.data.cars))
//       .catch((error) => console.error("Error fetching cars:", error));
//   };

//   const handleSearch = () => {
//     axios
//       .get(`http://localhost:3001/cars/search?q=${searchKeyword}`, {
//         withCredentials: true,
//       })
//       .then((response) => setCars(response.data.cars))
//       .catch((error) => console.error("Error searching cars:", error));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("tags", tags);
//     images.forEach((image, index) =>
//       formData.append(`images[${index}]`, image)
//     );

//     const apiCall = editingCar
//       ? axios.put(`http://localhost:3001/cars/${editingCar.id}`, formData, {
//           withCredentials: true,
//         })
//       : axios.post("http://localhost:3001/cars", formData, {
//           withCredentials: true,
//         });

//     apiCall
//       .then(() => {
//         alert(
//           editingCar ? "Car updated successfully!" : "Car added successfully!"
//         );
//         setIsAdding(false);
//         setEditingCar(null);
//         fetchCars();
//       })
//       .catch((error) => console.error("Error saving car:", error));
//   };

//   const handleEdit = (car) => {
//     setEditingCar(car);
//     setTitle(car.title);
//     setDescription(car.description);
//     setTags(car.tags.join(", "));
//     setImages([]); // Images will not be preloaded
//     setIsAdding(true);
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3001/cars/${id}`, { withCredentials: true })
//       .then(() => {
//         alert("Car deleted successfully!");
//         fetchCars();
//       })
//       .catch((error) => console.error("Error deleting car:", error));
//   };

//   if (loading) return <Typography align="center">Loading...</Typography>;

//   return (
//     <div style={styles.container}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Welcome Home {user && user.name}!
//       </Typography>

//       {isAdding ? (
//         <Box component="form" onSubmit={handleSubmit} style={styles.form}>
//           <Typography variant="h4" align="center">
//             {editingCar ? "Edit Car" : "Add New Car"}
//           </Typography>
//           <TextField
//             fullWidth
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             margin="normal"
//             multiline
//             rows={4}
//           />
//           <TextField
//             fullWidth
//             label="Tags (comma-separated)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             required
//             margin="normal"
//           />
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => setImages(Array.from(e.target.files))}
//             style={{ margin: "10px 0" }}
//           />
//           <div style={styles.buttonGroup}>
//             <Button type="submit" variant="contained" color="primary">
//               {editingCar ? "Update Car" : "Add Car"}
//             </Button>
//             <Button
//               type="button"
//               variant="outlined"
//               color="secondary"
//               onClick={() => {
//                 setIsAdding(false);
//                 setEditingCar(null);
//                 setTitle("");
//                 setDescription("");
//                 setTags("");
//                 setImages([]);
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </Box>
//       ) : (
//         <>
//           <div>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setIsAdding(true)}
//             >
//               Add New Car
//             </Button>
//             <TextField
//               label="Search cars..."
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//               style={{ marginLeft: "20px" }}
//             />
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={handleSearch}
//               style={{ marginLeft: "10px" }}
//             >
//               Search
//             </Button>
//           </div>
//           <div>
//             {cars.map((car) => (
//               <Card key={car.id} style={styles.card}>
//                 <CardContent>
//                   <Typography variant="h5">{car.title}</Typography>
//                   <Typography variant="body1">{car.description}</Typography>
//                   <div>
//                     {car.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`Car ${index}`}
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           margin: "5px",
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <Typography variant="body2">
//                     Tags: {car.tags.join(", ")}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     color="primary"
//                     onClick={() => alert(`Viewing car: ${car.id}`)}
//                   >
//                     View Details
//                   </Button>
//                   <Button
//                     size="small"
//                     color="warning"
//                     onClick={() => handleEdit(car)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(car.id)}
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import axios from "axios";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const styles = {
    container: { padding: "20px", color: "white" },
    card: { margin: "10px", backgroundColor: "#333", color: "white" },
    form: {
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#444",
      borderRadius: "8px",
      maxWidth: "600px",
      color: "white",
    },
    buttonGroup: { marginTop: "10px", display: "flex", gap: "10px" },
  };

  useEffect(() => {
    // Fetch user and their cars
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
          fetchCars();
        } else {
          alert("Please log in");
        }
      })
      .catch(() => alert("Error fetching user data"))
      .finally(() => setLoading(false));
  }, []);

  const fetchCars = () => {
    axios
      .get("http://localhost:3001/cars", { withCredentials: true })
      .then((response) => setCars(response.data.cars))
      .catch((error) => console.error("Error fetching cars:", error));
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:3001/cars/search?q=${searchKeyword}`, {
        withCredentials: true,
      })
      .then((response) => setCars(response.data.cars))
      .catch((error) => console.error("Error searching cars:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image, index) =>
      formData.append(`images[${index}]`, image)
    );

    axios
      .post("http://localhost:3001/cars", formData, { withCredentials: true })
      .then(() => {
        alert("Car added successfully!");
        setIsAdding(false);
        setTitle("");
        setDescription("");
        setTags("");
        setImages([]);
        fetchCars();
      })
      .catch((error) => console.error("Error saving car:", error));
  };

  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <div style={styles.container}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome Home {user && user.name}!
      </Typography>

      {isAdding ? (
        <Box component="form" onSubmit={handleSubmit} style={styles.form}>
          <Typography variant="h4" align="center">
            Add New Car
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            margin="normal"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            style={{ margin: "10px 0" }}
          />
          <div style={styles.buttonGroup}>
            <Button type="submit" variant="contained" color="primary">
              Add Car
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      ) : (
        <>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAdding(true)}
            >
              Add New Car
            </Button>
            <TextField
              label="Search cars..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ marginLeft: "20px" }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSearch}
              style={{ marginLeft: "10px" }}
            >
              Search
            </Button>
          </div>
          <div>
            {cars.map((car) => (
              <Card key={car.id} style={styles.card}>
                <CardContent>
                  <Typography variant="h5">{car.title}</Typography>
                  <Typography variant="body1">{car.description}</Typography>
                  <div>
                    {car.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Car ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="body2">
                    Tags: {car.tags.join(", ")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
