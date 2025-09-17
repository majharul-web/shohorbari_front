import Swal from "sweetalert2";
import "../../../css/alert.css";

interface IProps {
  type: "error" | "success" | "warning";
  message?: string;
  showConfirmButton?: boolean;
  timer?: number;
  timerCondition?: boolean;
  cancel?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string;
}

export const Alert = ({
  type = "success",
  message = "",
  showConfirmButton = false,
  showCancelButton = false,
  timer = 1500,
  timerCondition = true,
  confirmButtonText,
  confirmButtonColor = "#3085d6",
}: IProps) => {
  let title;
  if (type === "success") {
    title = "";
  } else if (type === "error") {
    title = "";
  } else {
    title = "Are you sure " + message;
  }

  let timerValue = timerCondition ? timer : undefined;

  let imageUrl;

  if (type === "success") {
    imageUrl = "https://i.ibb.co/8DXq6qPC/success.png";
  } else if (type === "error") {
    imageUrl = "https://i.ibb.co/d4B9V6mt/error.png";
  } else {
    imageUrl = "";
  }

  let classNameTitle;

  if (type === "success") {
    classNameTitle = "swal-success-title";
  } else if (type === "error") {
    classNameTitle = "swal-error-title";
  } else {
    classNameTitle = "swal-title-wr";
  }

  return Swal.fire({
    position: "center",
    title: title,
    text: type === "success" || type === "error" ? message : "",
    imageUrl: imageUrl,
    imageAlt: type,
    showConfirmButton,
    showCancelButton,
    timer: timerValue,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: confirmButtonColor,
    customClass: {
      title: classNameTitle,
      htmlContainer: "swal-content",
      container: type === "success" || type === "error" ? "swl-common-content" : "swl-asking-content",
    },
  });
};
