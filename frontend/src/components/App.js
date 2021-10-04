import React, { useEffect, useState } from "react";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import apiAuth from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    state: false,
    data: { link: "", name: "" },
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState("");

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [tooltipState, setTooltipState] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      apiAuth
        .checkToken(localStorage.getItem("token"))
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    api
      .getUserInfo(localStorage.getItem("token"))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((newCards) =>
          newCards.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ state: false, data: { link: "", name: "" } });
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({
      state: true,
      data: card,
    });
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar, clear) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((res) => {
        setCards((state) => {
          return [...state, res];
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(data) {
    apiAuth
      .login(data)
      .then((token) => {
        localStorage.setItem("token", token.token);
        apiAuth.checkToken(token.token).then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
        });
      })
      .catch((err) => console.log(err));
  }

  function handleClickExit() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  function handleRegisterSubmit(data) {
    apiAuth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setTooltipState(true);
        history.push("/sing-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setTooltipState(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onExit={handleClickExit} email={email} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          tooltipState={tooltipState}
          tooltipSuccess={"Вы успешно зарегистрировались!"}
          tooltipFail={"Что-то пошло не так! Попробуйте ещё раз."}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Switch>
          <Route path="/sign-up">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={handleRegisterSubmit} />
            )}
          </Route>
          <Route path="/sign-in">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={handleLoginSubmit} />
            )}
          </Route>
          <ProtectedRoute
            card={selectedCard}
            onImg={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
          >
            <Main />
          </ProtectedRoute>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
