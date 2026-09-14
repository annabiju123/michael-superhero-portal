import { CheckCircle2, X, Feather } from 'lucide-react';

function SuccessPopupModal({ isOpen, onClose, userName }) {
    if (!isOpen) return null;

    return (
        <div className="success-overlay">
            <div className="success-box">

                {/* Decorative glow */}
                <div className="success-glow success-glow-one"></div>
                <div className="success-glow success-glow-two"></div>

                {/* Close button */}
                <button
                    className="success-close"
                    onClick={onClose}
                    aria-label="Close success message"
                >
                    <X size={20} />
                </button>

                {/* Flying Angel */}
                <div className="flying-angel">
                    <div className="angel-wings">
                        🪽
                    </div>

                    <div className="angel-star">✦</div>
                </div>

                {/* Status */}
                <div className="success-status">
                    <CheckCircle2 size={16} />
                    <span>Message Received</span>
                </div>

                {/* Main message */}
                <h2>You Have Been Heard!</h2>

                <p className="success-message">
                    Peace be upon your heart,{' '}
                    <strong>{userName || 'dear soul'}</strong>.
                    <br />
                    Michael has received your message.
                </p>

                <p className="success-submessage">
                    You don't have to carry everything alone.
                    Take a breath. You are not alone.
                </p>

                {/* Action */}
                <button
                    className="success-action"
                    onClick={onClose}
                >
                    <Feather size={17} />
                    <span>Rest in Peace &amp; Hope</span>
                </button>

            </div>
        </div>
    );
}

export default SuccessPopupModal;