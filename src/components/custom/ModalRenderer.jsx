import SuccessModal from "@/components/custom/successModal";
import ErrorModal from "@/components/custom/errorModal";
import DeleteModal from "@/components/custom/deleteModal";

export function ModalRenderer({ modal, closeModal }) {
  if (!modal.type) return null;

  switch (modal.type) {
    case "success":
      return (
        <SuccessModal isOpen={true} onClose={closeModal} {...modal.props} />
      );
    case "error":
      return <ErrorModal isOpen={true} onClose={closeModal} {...modal.props} />;
    case "delete": {
      return (
        <DeleteModal isOpen={true} onClose={closeModal} {...modal.props} />
      );
    }
    default:
      return null;
  }
}
