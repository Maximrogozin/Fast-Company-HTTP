import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const { getUserById } = useUser();
    const history = useHistory();

    const { currentUser, updateUser } = useAuth();
    const user = getUserById(userId);
    if (userId !== currentUser._id) {
        history.goBack();
    }

    const { profession } = useProfessions();
    const professionsList = profession.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const { quality } = useQualities();
    const qualitiesList = quality.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const { getQuality } = useQualities();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        updateUser(newData);
        history.goBack();
    };

    const transformData = (data) => {
        return data.map((qual) => ({
            label: getQuality(qual).name,
            value: getQuality(qual)._id
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        const { profession, qualities, ...userData } = user;
        setData((prevState) => ({
            ...prevState,
            ...userData,
            qualities: transformData(qualities),
            profession: profession
        }));
    }, [user]);

    useEffect(() => {
        if (data._id !== undefined && data._id !== "") setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                {!isLoading ? (
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                ) : (
                    "Loading..."
                )}
            </div>
        </div>
    );
};

export default EditUserPage;

// import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { validator } from "../../../utils/validator";
// import TextField from "../../common/form/textField";
// import SelectField from "../../common/form/selectField";
// import RadioField from "../../common/form/radioField";
// import MultiSelectField from "../../common/form/multiSelectField";
// import BackHistoryButton from "../../common/backButton";
// import { useUser } from "../../../hooks/useUsers";
// import { useProfessions } from "../../../hooks/useProfessions";
// import { useQualities } from "../../../hooks/useQualities";
// import { useAuth } from "../../../hooks/useAuth";

// const EditUserPage = () => {
//     const { userId } = useParams();
//     const { getUserById } = useUser();
//     const { currentUser } = useAuth();
//     const user = getUserById(userId);
//     const { createUser } = useAuth();

//     const { profession } = useProfessions();
//     const professionsList = profession.map((p) => ({
//         label: p.name,
//         value: p._id
//     }));

//     const { quality } = useQualities();
//     const qualitiesList = quality.map((q) => ({
//         label: q.name,
//         value: q._id
//     }));

//     const { getQuality } = useQualities();

//     const history = useHistory();
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         profession: "",
//         sex: "male",
//         qualities: []
//     });
//     console.log(data);
//     const [errors, setErrors] = useState({});
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         const newData = {
//             ...data,
//             qualities: data.qualities.map((q) => q.value)
//         };
//         createUser(newData);
//         history.goBack();
//     };
//     const transformData = (data) => {
//         return data.map((qual) => ({
//             label: getQuality(qual).name,
//             value: getQuality(qual)._id
//         }));
//     };
//     useEffect(() => {
//         setIsLoading(true);
//         const { profession, qualities, ...data } = user;
//         setData((prevState) => ({
//             ...prevState,
//             ...data,
//             qualities: transformData(qualities),
//             profession: profession
//         }));
//     }, [user]);
//     useEffect(() => {
//         if (data._id) setIsLoading(false);
//     }, [data]);

//     const validatorConfig = {
//         email: {
//             isRequired: {
//                 message: "Электронная почта обязательна для заполнения"
//             },
//             isEmail: {
//                 message: "Email введен некорректно"
//             }
//         },
//         name: {
//             isRequired: {
//                 message: "Введите ваше имя"
//             }
//         }
//     };
//     useEffect(() => {
//         validate();
//     }, [data]);
//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };
//     const validate = () => {
//         const errors = validator(data, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     const isValid = Object.keys(errors).length === 0;
//     return (
//         <div className="container mt-5">
//             <BackHistoryButton />
//             <div className="row">
//                 {!isLoading ? (
//                     <div className="col-md-6 offset-md-3 shadow p-4">
//                         {/* && Object.keys(professions).length > 0 */}
//                         {currentUser._id === data._id ? (
//                             <form onSubmit={handleSubmit}>
//                                 <TextField
//                                     label="Имя"
//                                     name="name"
//                                     value={data.name}
//                                     onChange={handleChange}
//                                     error={errors.name}
//                                 />
//                                 <TextField
//                                     label="Электронная почта"
//                                     name="email"
//                                     value={data.email}
//                                     onChange={handleChange}
//                                     error={errors.email}
//                                 />
//                                 <SelectField
//                                     label="Выбери свою профессию"
//                                     defaultOption="Choose..."
//                                     options={professionsList}
//                                     name="profession"
//                                     onChange={handleChange}
//                                     value={data.profession}
//                                     error={errors.profession}
//                                 />
//                                 <RadioField
//                                     options={[
//                                         { name: "Male", value: "male" },
//                                         { name: "Female", value: "female" },
//                                         { name: "Other", value: "other" }
//                                     ]}
//                                     value={data.sex}
//                                     name="sex"
//                                     onChange={handleChange}
//                                     label="Выберите ваш пол"
//                                 />
//                                 <MultiSelectField
//                                     defaultValue={data.qualities}
//                                     options={qualitiesList}
//                                     onChange={handleChange}
//                                     name="qualities"
//                                     label="Выберите ваши качества"
//                                 />
//                                 <button
//                                     type="submit"
//                                     disabled={!isValid}
//                                     className="btn btn-primary w-100 mx-auto"
//                                 >
//                                     Обновить
//                                 </button>
//                             </form>
//                         ) : (
//                             history.goBack()
//                         )}
//                     </div>
//                 ) : (
//                     "Loading..."
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EditUserPage;

// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { validator } from "../../../utils/validator";
// import api from "../../../api";
// import TextField from "../../common/form/textField";
// import SelectField from "../../common/form/selectField";
// import RadioField from "../../common/form/radioField";
// import MultiSelectField from "../../common/form/multiSelectField";
// import BackHistoryButton from "../../common/backButton";

// const EditUserPage = () => {
//     const { userId } = useParams();
//     const history = useHistory();
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState({
//         name: "",
//         email: "",
//         profession: "",
//         sex: "male",
//         qualities: []
//     });
//     const [professions, setProfession] = useState([]);
//     const [qualities, setQualities] = useState([]);
//     const [errors, setErrors] = useState({});
//     const getProfessionById = (id) => {
//         for (const prof of professions) {
//             if (prof.value === id) {
//                 return { _id: prof.value, name: prof.label };
//             }
//         }
//     };
//     const getQualities = (elements) => {
//         const qualitiesArray = [];
//         for (const elem of elements) {
//             for (const quality in qualities) {
//                 if (elem.value === qualities[quality].value) {
//                     qualitiesArray.push({
//                         _id: qualities[quality].value,
//                         name: qualities[quality].label,
//                         color: qualities[quality].color
//                     });
//                 }
//             }
//         }
//         return qualitiesArray;
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         const { profession, qualities } = data;
//         api.users
//             .update(userId, {
//                 ...data,
//                 profession: getProfessionById(profession),
//                 qualities: getQualities(qualities)
//             })
//             .then((data) => history.push(`/users/${data._id}`));
//         console.log({
//             ...data,
//             profession: getProfessionById(profession),
//             qualities: getQualities(qualities)
//         });
//     };
//     const transformData = (data) => {
//         return data.map((qual) => ({ label: qual.name, value: qual._id }));
//     };
//     useEffect(() => {
//         setIsLoading(true);
//         api.users.getById(userId).then(({ profession, qualities, ...data }) =>
//             setData((prevState) => ({
//                 ...prevState,
//                 ...data,
//                 qualities: transformData(qualities),
//                 profession: profession._id
//             }))
//         );
//         api.professions.fetchAll().then((data) => {
//             const professionsList = Object.keys(data).map((professionName) => ({
//                 label: data[professionName].name,
//                 value: data[professionName]._id
//             }));
//             setProfession(professionsList);
//         });
//         api.qualities.fetchAll().then((data) => {
//             const qualitiesList = Object.keys(data).map((optionName) => ({
//                 value: data[optionName]._id,
//                 label: data[optionName].name,
//                 color: data[optionName].color
//             }));
//             setQualities(qualitiesList);
//         });
//     }, []);
//     useEffect(() => {
//         if (data._id) setIsLoading(false);
//     }, [data]);

//     const validatorConfig = {
//         email: {
//             isRequired: {
//                 message: "Электронная почта обязательна для заполнения"
//             },
//             isEmail: {
//                 message: "Email введен некорректно"
//             }
//         },
//         name: {
//             isRequired: {
//                 message: "Введите ваше имя"
//             }
//         }
//     };
//     useEffect(() => {
//         validate();
//     }, [data]);
//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };
//     const validate = () => {
//         const errors = validator(data, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     const isValid = Object.keys(errors).length === 0;
//     return (
//         <div className="container mt-5">
//             <BackHistoryButton />
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 shadow p-4">
//                     {!isLoading && Object.keys(professions).length > 0 ? (
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 label="Имя"
//                                 name="name"
//                                 value={data.name}
//                                 onChange={handleChange}
//                                 error={errors.name}
//                             />
//                             <TextField
//                                 label="Электронная почта"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={handleChange}
//                                 error={errors.email}
//                             />
//                             <SelectField
//                                 label="Выбери свою профессию"
//                                 defaultOption="Choose..."
//                                 options={professions}
//                                 name="profession"
//                                 onChange={handleChange}
//                                 value={data.profession}
//                                 error={errors.profession}
//                             />
//                             <RadioField
//                                 options={[
//                                     { name: "Male", value: "male" },
//                                     { name: "Female", value: "female" },
//                                     { name: "Other", value: "other" }
//                                 ]}
//                                 value={data.sex}
//                                 name="sex"
//                                 onChange={handleChange}
//                                 label="Выберите ваш пол"
//                             />
//                             <MultiSelectField
//                                 defaultValue={data.qualities}
//                                 options={qualities}
//                                 onChange={handleChange}
//                                 name="qualities"
//                                 label="Выберите ваши качества"
//                             />
//                             <button
//                                 type="submit"
//                                 disabled={!isValid}
//                                 className="btn btn-primary w-100 mx-auto"
//                             >
//                                 Обновить
//                             </button>
//                         </form>
//                     ) : (
//                         "Loading..."
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditUserPage;
