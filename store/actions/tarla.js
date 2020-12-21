export const CREATE_TARLA = "CREATE_TARLA";

export const createTarla = (zeminId, eklenmisVeri) => {
  return (dispatch) => {
    fetch();
    dispatch({
      type: CREATE_TARLA,
      tarlaData: {
        zeminId,
        eklenmisVeri,
      },
    });
  };
};
