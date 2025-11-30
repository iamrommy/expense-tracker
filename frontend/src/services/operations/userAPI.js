import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setUser } from "../../redux/slices/userSlice";

const { MONTHLY_GOAL_API } = endpoints;

export function SetMonthlyGoal(token, monthlyGoal, done) {

  return async (dispatch) => {
    const toastId = toast.loading("Saving Changes...");

    try {
      const response = await apiConnector(
        "PUT",
        MONTHLY_GOAL_API,
        { monthlyGoal },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

    //   console.log("SET MONTHLY GOAL API RESPONSE:", response);

      if (response.status !== 200) {
        throw new Error("SET MONTHLY GOAL Failed");
      }

      toast.success("Saved Changes");

      dispatch(setUser(response?.data));
      localStorage.setItem("user", JSON.stringify(response?.data));

    } catch (error) {
    //   console.log("SET MONTHLY GOAL API ERROR:", error);
      toast.error("Error Saving changes");
    }

    toast.dismiss(toastId);

    if (done) done();
  };
}

