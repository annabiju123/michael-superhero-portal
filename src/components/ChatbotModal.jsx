import { useEffect, useRef, useState } from 'react';

import {
    X,
    Send,
    UserRound,
    CalendarDays,
    MapPin,
    Mail,
    MessageCircle,
    Feather,
    Pencil,
    Save,
} from 'lucide-react';


// =====================================================
// EDITABLE FIELD
// IMPORTANT: This component stays OUTSIDE ChatbotModal
// so the input does not lose focus while typing.
// =====================================================

function EditField({
    icon: Icon,
    label,
    value,
    field,
    inputRef,
    textarea = false,
    onChange,
}) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            // Remove cursor/focus from the field
            event.currentTarget.blur();
        }
    };

    return (
        <div className="michael-edit-field">

            <div className="michael-edit-icon">
                <Icon size={17} />
            </div>

            <div className="michael-edit-content">

                <label>{label}</label>

                {textarea ? (
                    <textarea
                        ref={inputRef}
                        value={value}
                        onChange={(event) =>
                            onChange(field, event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        rows="2"
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type={field === 'email' ? 'email' : 'text'}
                        value={value}
                        onChange={(event) =>
                            onChange(field, event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />
                )}

            </div>

        </div>
    );
}


// =====================================================
// CHATBOT
// =====================================================

function ChatbotModal({ onClose }) {

    // =====================================================
    // INITIAL CHAT
    // =====================================================

    const [messages, setMessages] = useState([
        {
            sender: 'michael',
            text:
                'Hello. I’m Michael. I’m here to listen. ✦\nBefore we begin, may I know your name?',
        },
    ]);

    const [step, setStep] = useState('name');

    const [input, setInput] = useState('');

    // =====================================================
    // VISITOR DETAILS
    // =====================================================

    const [visitor, setVisitor] = useState({
        name: '',
        age: '',
        location: '',
        email: '',
        problem: '',
    });

    // =====================================================
    // CONFIRMATION STATE
    // =====================================================

    const [showConfirmation, setShowConfirmation] =
        useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [sending, setSending] = useState(false);

    // =====================================================
    // EDIT DETAILS
    // =====================================================

    const [editDetails, setEditDetails] = useState({
        name: '',
        age: '',
        location: '',
        email: '',
        problem: '',
    });

    // =====================================================
    // REFS
    // =====================================================

    const nameInputRef = useRef(null);

    const messagesEndRef = useRef(null);


    // =====================================================
    // AUTOMATIC CHAT SCROLL
    // =====================================================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [messages]);


    // =====================================================
    // FOCUS NAME FIELD WHEN EDIT MODE OPENS
    // =====================================================

    useEffect(() => {

        if (isEditing) {

            setTimeout(() => {

                nameInputRef.current?.focus();

                nameInputRef.current?.select();

            }, 100);

        }

    }, [isEditing]);


    // =====================================================
    // ADD MESSAGE
    // =====================================================

    const addMessage = (sender, text) => {

        setMessages((previous) => [
            ...previous,
            {
                sender,
                text,
            },
        ]);

    };


    // =====================================================
    // HANDLE CHAT INPUT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        const value = input.trim();

        if (!value || sending) {
            return;
        }

        // Add visitor message
        addMessage('user', value);

        // Clear input
        setInput('');


        // ===================================================
        // NAME
        // ===================================================

        if (step === 'name') {

            setVisitor((previous) => ({
                ...previous,
                name: value,
            }));

            setStep('age');

            setTimeout(() => {

                addMessage(
                    'michael',
                    `It’s lovely to meet you, ${value}. How old are you?`
                );

            }, 400);

            return;
        }


        // ===================================================
        // AGE
        // ===================================================

        if (step === 'age') {

            setVisitor((previous) => ({
                ...previous,
                age: value,
            }));

            setStep('location');

            setTimeout(() => {

                addMessage(
                    'michael',
                    'Thank you. And where are you from?'
                );

            }, 400);

            return;
        }


        // ===================================================
        // LOCATION
        // ===================================================

        if (step === 'location') {

            setVisitor((previous) => ({
                ...previous,
                location: value,
            }));

            setStep('email');

            setTimeout(() => {

                addMessage(
                    'michael',
                    'Got it. May I have your email address?'
                );

            }, 400);

            return;
        }


        // ===================================================
        // EMAIL
        // ===================================================

        if (step === 'email') {

            if (
                !value.includes('@') ||
                !value.includes('.')
            ) {

                addMessage(
                    'michael',
                    'Please enter a valid email address.'
                );

                return;
            }

            setVisitor((previous) => ({
                ...previous,
                email: value,
            }));

            setStep('problem');

            setTimeout(() => {

                addMessage(
                    'michael',
                    'Thank you. ✦ So... tell me. How can I help you?'
                );

            }, 400);

            return;
        }


        // ===================================================
        // PROBLEM
        // ===================================================

        if (step === 'problem') {

            const finalVisitor = {
                ...visitor,
                problem: value,
            };

            setVisitor(finalVisitor);

            setEditDetails(finalVisitor);

            setShowConfirmation(true);
        }

    };


    // =====================================================
    // START EDITING
    // =====================================================

    const handleEdit = () => {

        setEditDetails({
            name: visitor.name,
            age: visitor.age,
            location: visitor.location,
            email: visitor.email,
            problem: visitor.problem,
        });

        setIsEditing(true);

    };


    // =====================================================
    // HANDLE EDIT FIELD
    // =====================================================

    const handleEditChange = (field, value) => {

        setEditDetails((previous) => ({
            ...previous,
            [field]: value,
        }));

    };


    // =====================================================
    // SAVE CHANGES
    // =====================================================

    const handleSaveChanges = () => {

        if (!editDetails.name.trim()) {

            alert('Please enter your name.');

            return;
        }


        if (!editDetails.email.includes('@')) {

            alert('Please enter a valid email address.');

            return;
        }


        if (!editDetails.problem.trim()) {

            alert('Please enter your message.');

            return;
        }


        const updatedVisitor = {
            name: editDetails.name.trim(),
            age: editDetails.age.trim(),
            location: editDetails.location.trim(),
            email: editDetails.email.trim(),
            problem: editDetails.problem.trim(),
        };


        setVisitor(updatedVisitor);

        setEditDetails(updatedVisitor);

        setIsEditing(false);

    };


    // =====================================================
    // SEND REQUEST
    // =====================================================

    const sendRequest = async () => {

        if (sending) {
            return;
        }

        setSending(true);

        try {

            const response = await fetch(
                '/api/send-request',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(visitor),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    'Unable to send request.'
                );

            }


            // Close confirmation
            setShowConfirmation(false);


            // Return to chatbot
            setTimeout(() => {

                addMessage(
                    'michael',
                    "Your message has been heard. 😊 You don't have to carry it alone. I'm glad you reached out."
                );

            }, 300);


        } catch (error) {

            console.error(
                'Send request error:',
                error
            );


            addMessage(
                'michael',
                'I’m sorry, something went wrong while sending your message. Please try again.'
            );


        } finally {

            setSending(false);

        }

    };


    // =====================================================
    // DETAIL ROW
    // =====================================================

    const DetailRow = ({
        icon: Icon,
        label,
        value,
    }) => {

        return (
            <div className="michael-confirm-detail">

                <div className="michael-confirm-icon">
                    <Icon size={17} />
                </div>

                <div className="michael-confirm-content">

                    <span>{label}</span>

                    <strong>{value}</strong>

                </div>

            </div>
        );

    };


    // =====================================================
    // UI
    // =====================================================

    return (
        <>

            {/* =================================================
          CHATBOT
      ================================================= */}

            <div className="michael-chat-overlay">

                <div className="michael-chat-window">


                    {/* =============================================
              HEADER
          ============================================== */}

                    <div className="michael-chat-header">

                        <div className="michael-chat-profile">

                            <div className="michael-chat-avatar">
                                ✦
                            </div>

                            <div className="michael-chat-profile-text">

                                <h3>Michael</h3>

                                <span>
                                    Guardian of Hope
                                </span>

                            </div>

                        </div>


                        <button
                            className="michael-chat-close"
                            onClick={onClose}
                            aria-label="Close chatbot"
                        >
                            <X size={21} />
                        </button>

                    </div>


                    {/* =============================================
              MESSAGES
          ============================================== */}

                    <div className="michael-chat-messages">

                        {messages.map((message, index) => (

                            <div
                                key={index}
                                className={
                                    message.sender === 'user'
                                        ? 'michael-user-row'
                                        : 'michael-message-row'
                                }
                            >

                                {message.sender === 'michael' && (

                                    <div className="michael-message-star">
                                        ✦
                                    </div>

                                )}


                                <div
                                    className={
                                        message.sender === 'user'
                                            ? 'michael-user-message'
                                            : 'michael-bot-message'
                                    }
                                >

                                    {message.text
                                        .split('\n')
                                        .map((line, lineIndex) => (

                                            <span key={lineIndex}>

                                                {line}

                                                {lineIndex <
                                                    message.text.split('\n').length - 1 && (
                                                        <br />
                                                    )}

                                            </span>

                                        ))}

                                </div>

                            </div>

                        ))}


                        <div ref={messagesEndRef} />

                    </div>


                    {/* =============================================
              INPUT
          ============================================== */}

                    <form
                        className="michael-chat-input"
                        onSubmit={handleSubmit}
                    >

                        {step === 'problem' ? (

                            <textarea
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                                placeholder="Tell Michael what is on your mind..."
                                rows="2"
                                disabled={sending}
                            />

                        ) : (

                            <input
                                type={
                                    step === 'email'
                                        ? 'email'
                                        : 'text'
                                }
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                                placeholder={
                                    step === 'name'
                                        ? 'Your name...'
                                        : step === 'age'
                                            ? 'Your age...'
                                            : step === 'location'
                                                ? 'Your location...'
                                                : 'Your email...'
                                }
                                disabled={sending}
                            />

                        )}


                        <button
                            type="submit"
                            disabled={
                                !input.trim() ||
                                sending
                            }
                        >
                            <Send size={19} />
                        </button>

                    </form>

                </div>


                {/* =================================================
            CONFIRMATION POPUP
        ================================================= */}

                {showConfirmation && (

                    <div className="michael-confirm-overlay">

                        <div className="michael-confirm-box">


                            {/* =========================================
                  SYMBOL
              ========================================== */}

                            <div className="michael-confirm-symbol">
                                ✦
                            </div>


                            {/* CLOSE */}

                            <button
                                className="michael-confirm-close"
                                onClick={() =>
                                    setShowConfirmation(false)
                                }
                                disabled={sending}
                            >
                                <X size={19} />
                            </button>


                            {/* TITLE */}

                            <h2>
                                {isEditing
                                    ? 'Edit Your Details'
                                    : 'Before I Send This...'}
                            </h2>


                            <p className="michael-confirm-intro">

                                {isEditing
                                    ? 'You can change any information below.'
                                    : 'Please make sure these details are correct.'}

                            </p>


                            {/* =========================================
                  EDIT MODE
              ========================================== */}

                            {isEditing ? (

                                <div className="michael-edit-details">


                                    <EditField
                                        icon={UserRound}
                                        label="Name"
                                        field="name"
                                        value={editDetails.name}
                                        inputRef={nameInputRef}
                                        onChange={handleEditChange}
                                    />


                                    <EditField
                                        icon={CalendarDays}
                                        label="Age"
                                        field="age"
                                        value={editDetails.age}
                                        onChange={handleEditChange}
                                    />


                                    <EditField
                                        icon={MapPin}
                                        label="Location"
                                        field="location"
                                        value={editDetails.location}
                                        onChange={handleEditChange}
                                    />


                                    <EditField
                                        icon={Mail}
                                        label="Email"
                                        field="email"
                                        value={editDetails.email}
                                        onChange={handleEditChange}
                                    />


                                    <EditField
                                        icon={MessageCircle}
                                        label="Your message"
                                        field="problem"
                                        value={editDetails.problem}
                                        textarea
                                        onChange={handleEditChange}
                                    />

                                </div>

                            ) : (

                                /* =========================================
                                   NORMAL CONFIRMATION
                                ========================================== */

                                <div className="michael-confirm-details">


                                    <DetailRow
                                        icon={UserRound}
                                        label="Name"
                                        value={visitor.name}
                                    />


                                    <DetailRow
                                        icon={CalendarDays}
                                        label="Age"
                                        value={visitor.age}
                                    />


                                    <DetailRow
                                        icon={MapPin}
                                        label="Location"
                                        value={visitor.location}
                                    />


                                    <DetailRow
                                        icon={Mail}
                                        label="Email"
                                        value={visitor.email}
                                    />


                                    <div className="michael-confirm-detail michael-confirm-problem">

                                        <div className="michael-confirm-icon">
                                            <MessageCircle size={17} />
                                        </div>

                                        <div className="michael-confirm-content">

                                            <span>
                                                Your message
                                            </span>

                                            <strong>
                                                {visitor.problem}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* =========================================
                  BUTTONS
              ========================================== */}

                            <div className="michael-confirm-buttons">

                                {isEditing ? (

                                    <>

                                        <button
                                            className="michael-edit-button"
                                            onClick={() =>
                                                setIsEditing(false)
                                            }
                                            disabled={sending}
                                        >
                                            <X size={16} />

                                            <span>
                                                Cancel
                                            </span>
                                        </button>


                                        <button
                                            className="michael-send-button"
                                            onClick={handleSaveChanges}
                                            disabled={sending}
                                        >
                                            <Save size={16} />

                                            <span>
                                                Save Changes
                                            </span>
                                        </button>

                                    </>

                                ) : (

                                    <>

                                        <button
                                            className="michael-edit-button"
                                            onClick={handleEdit}
                                            disabled={sending}
                                        >
                                            <Pencil size={16} />

                                            <span>
                                                Edit
                                            </span>
                                        </button>


                                        <button
                                            className="michael-send-button"
                                            onClick={sendRequest}
                                            disabled={sending}
                                        >
                                            <Feather size={16} />

                                            <span>
                                                {sending
                                                    ? 'Sending...'
                                                    : 'Confirm & Send'}
                                            </span>

                                        </button>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* =================================================
          PRIVATE CHATBOT CSS
      ================================================= */}

            <style>{`

        /* =========================================
           CHAT OVERLAY
        ========================================= */

        .michael-chat-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 24px;

          background:
            rgba(0, 0, 0, 0.78);

          backdrop-filter: blur(10px);
        }


        /* =========================================
           CHAT WINDOW
        ========================================= */

        .michael-chat-window {
          position: relative;

          width: min(520px, 92vw);
          height: min(700px, 88vh);

          display: flex;
          flex-direction: column;

          overflow: hidden;

          border:
            1px solid
            rgba(220, 185, 105, 0.35);

          border-radius: 25px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(170, 120, 40, 0.13),
              transparent 45%
            ),
            #090807;

          box-shadow:
            0 0 70px
            rgba(210, 160, 70, 0.13),
            0 25px 80px
            rgba(0, 0, 0, 0.8);
        }


        /* =========================================
           HEADER
        ========================================= */

        .michael-chat-header {
          position: relative;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          min-height: 105px;

          padding:
            18px 65px 18px 18px;

          border-bottom:
            1px solid
            rgba(220, 185, 105, 0.16);
        }


        .michael-chat-profile {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 13px;
        }


        .michael-chat-avatar {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          color: #f4dfaa;

          font-size: 23px;

          border:
            1px solid
            rgba(220, 185, 105, 0.5);

          background:
            rgba(220, 185, 105, 0.08);
        }


        .michael-chat-profile-text {
          text-align: left;
        }


        .michael-chat-profile h3 {
          margin: 0;

          color: #f4dfaa;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 27px;

          font-weight: 600;
        }


        .michael-chat-profile span {
          display: block;

          color:
            rgba(245, 230, 195, 0.58);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 15px;
        }


        .michael-chat-close {
          position: absolute;

          right: 20px;

          top: 50%;

          transform:
            translateY(-50%);

          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(220, 185, 105, 0.25);

          border-radius: 10px;

          color:
            rgba(245, 230, 195, 0.75);

          background:
            rgba(220, 185, 105, 0.05);

          cursor: pointer;
        }


        .michael-chat-close:hover {
          color: #f4dfaa;

          border-color:
            rgba(220, 185, 105, 0.55);
        }


        /* =========================================
           MESSAGES
        ========================================= */

        .michael-chat-messages {
          flex: 1;

          min-height: 0;

          padding: 28px 25px;

          overflow-y: auto;

          display: flex;

          flex-direction: column;

          gap: 16px;
        }


        .michael-message-row {
          display: flex;

          align-items: flex-end;

          gap: 8px;

          max-width: 88%;
        }


        .michael-user-row {
          display: flex;

          justify-content: flex-end;

          max-width: 88%;

          margin-left: auto;
        }


        .michael-message-star {
          flex-shrink: 0;

          color: #f4dfaa;

          font-size: 15px;

          margin-bottom: 8px;
        }


        .michael-bot-message {
          padding: 13px 17px;

          color: #ead9b0;

          background:
            rgba(220, 185, 105, 0.08);

          border:
            1px solid
            rgba(220, 185, 105, 0.14);

          border-radius: 18px;

          border-bottom-left-radius: 5px;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 18px;

          line-height: 1.45;
        }


        .michael-user-message {
          padding: 13px 17px;

          color: white;

          background:
            linear-gradient(
              135deg,
              rgba(130, 90, 30, 0.68),
              rgba(75, 55, 25, 0.68)
            );

          border-radius: 18px;

          border-bottom-right-radius: 5px;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 18px;

          line-height: 1.4;
        }


        /* =========================================
           CHAT INPUT
        ========================================= */

        .michael-chat-input {
          flex-shrink: 0;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 17px 18px;

          border-top:
            1px solid
            rgba(220, 185, 105, 0.16);
        }


        .michael-chat-input input,
        .michael-chat-input textarea {
          flex: 1;

          min-width: 0;

          box-sizing: border-box;

          padding: 13px 17px;

          outline: none;

          border:
            1px solid
            rgba(220, 185, 105, 0.22);

          border-radius: 30px;

          color: white;

          background:
            rgba(255, 255, 255, 0.04);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 17px;

          resize: none;
        }


        .michael-chat-input textarea {
          border-radius: 18px;
        }


        .michael-chat-input input::placeholder,
        .michael-chat-input textarea::placeholder {
          color:
            rgba(255, 255, 255, 0.35);
        }


        .michael-chat-input input:focus,
        .michael-chat-input textarea:focus {
          border-color:
            rgba(220, 185, 105, 0.55);
        }


        .michael-chat-input button {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border: none;

          border-radius: 50%;

          color: #080706;

          background: #e2c477;

          cursor: pointer;

          transition: 0.2s;
        }


        .michael-chat-input button:hover:not(:disabled) {
          transform: scale(1.07);

          box-shadow:
            0 0 22px
            rgba(220, 185, 105, 0.4);
        }


        .michael-chat-input button:disabled {
          opacity: 0.45;

          cursor: not-allowed;
        }


        /* =========================================
           CONFIRMATION OVERLAY
        ========================================= */

        .michael-confirm-overlay {
          position: fixed;

          inset: 0;

          z-index: 1100;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 20px;

          background:
            rgba(0, 0, 0, 0.74);

          backdrop-filter: blur(8px);
        }


        /* =========================================
           CONFIRMATION BOX
        ========================================= */

        .michael-confirm-box {
          position: relative;

          width: min(500px, 92vw);

          max-height: 90vh;

          box-sizing: border-box;

          padding: 28px;

          overflow-y: auto;

          border:
            1px solid
            rgba(220, 185, 105, 0.55);

          border-radius: 25px;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(170, 120, 40, 0.13),
              transparent 48%
            ),
            #0c0a08;

          box-shadow:
            0 0 55px
            rgba(220, 185, 105, 0.13),
            0 25px 80px
            rgba(0, 0, 0, 0.75);
        }


        /* =========================================
           SYMBOL
        ========================================= */

        .michael-confirm-symbol {
          width: 48px;
          height: 48px;

          display: flex;

          align-items: center;
          justify-content: center;

          margin: -48px auto 12px;

          border:
            1px solid
            rgba(220, 185, 105, 0.5);

          border-radius: 50%;

          color: #f4dfaa;

          background: #0c0a08;

          font-size: 22px;
        }


        /* =========================================
           CONFIRM CLOSE
        ========================================= */

        .michael-confirm-close {
          position: absolute;

          top: 16px;
          right: 16px;

          width: 34px;
          height: 34px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            rgba(220, 185, 105, 0.2);

          border-radius: 9px;

          color:
            rgba(245, 230, 195, 0.7);

          background:
            rgba(220, 185, 105, 0.04);

          cursor: pointer;
        }


        /* =========================================
           CONFIRM TITLE
        ========================================= */

        .michael-confirm-box h2 {
          margin: 0;

          text-align: center;

          color: #f4dfaa;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 34px;

          font-weight: 600;
        }


        .michael-confirm-intro {
          margin: 5px 0 18px;

          text-align: center;

          color:
            rgba(245, 230, 195, 0.62);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 16px;
        }


        /* =========================================
           NORMAL DETAILS
        ========================================= */

        .michael-confirm-details {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }


        .michael-confirm-detail {
          min-height: 45px;

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 7px 11px;

          box-sizing: border-box;

          border:
            1px solid
            rgba(220, 185, 105, 0.18);

          border-radius: 12px;

          background:
            rgba(220, 185, 105, 0.045);
        }


        .michael-confirm-icon {
          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #e4c77d;

          background:
            rgba(220, 185, 105, 0.09);
        }


        .michael-confirm-content {
          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 1px;
        }


        .michael-confirm-content span {
          color:
            rgba(245, 230, 195, 0.48);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 13px;
        }


        .michael-confirm-content strong {
          display: block;

          color: #ead9b0;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 16px;

          font-weight: 600;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;
        }


        .michael-confirm-problem {
          align-items: flex-start;

          min-height: 65px;
        }


        .michael-confirm-problem
        .michael-confirm-content
        strong {
          white-space: normal;

          line-height: 1.25;

          display: -webkit-box;

          -webkit-line-clamp: 2;

          -webkit-box-orient: vertical;

          overflow: hidden;
        }


        /* =========================================
           EDIT FIELDS
        ========================================= */

        .michael-edit-details {
          display: flex;

          flex-direction: column;

          gap: 8px;
        }


        .michael-edit-field {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          padding: 8px 10px;

          border:
            1px solid
            rgba(220, 185, 105, 0.22);

          border-radius: 12px;

          background:
            rgba(220, 185, 105, 0.045);
        }


        .michael-edit-icon {
          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-top: 18px;

          border-radius: 9px;

          color: #e4c77d;

          background:
            rgba(220, 185, 105, 0.09);
        }


        .michael-edit-content {
          flex: 1;

          min-width: 0;

          display: flex;

          flex-direction: column;

          gap: 3px;
        }


        .michael-edit-content label {
          color:
            rgba(245, 230, 195, 0.55);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 13px;
        }


        .michael-edit-content input,
        .michael-edit-content textarea {
          width: 100%;

          box-sizing: border-box;

          padding: 7px 9px;

          outline: none;

          border:
            1px solid
            rgba(220, 185, 105, 0.25);

          border-radius: 8px;

          color: #f4dfaa;

          background:
            rgba(0, 0, 0, 0.28);

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 16px;
        }


        .michael-edit-content textarea {
          min-height: 55px;

          resize: vertical;

          border-radius: 9px;
        }


        .michael-edit-content input:focus,
        .michael-edit-content textarea:focus {
          border-color:
            rgba(220, 185, 105, 0.65);

          box-shadow:
            0 0 12px
            rgba(220, 185, 105, 0.08);
        }


        /* =========================================
           BUTTONS
        ========================================= */

        .michael-confirm-buttons {
          display: flex;

          gap: 10px;

          margin-top: 16px;
        }


        .michael-edit-button,
        .michael-send-button {
          height: 46px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          border-radius: 13px;

          font-family:
            'Cormorant Garamond',
            Georgia,
            serif;

          font-size: 17px;

          cursor: pointer;

          transition: 0.2s;
        }


        .michael-edit-button {
          flex: 0.85;

          color: #ead9b0;

          border:
            1px solid
            rgba(220, 185, 105, 0.3);

          background:
            rgba(220, 185, 105, 0.03);
        }


        .michael-send-button {
          flex: 1.15;

          color: #15110a;

          border: none;

          background:
            linear-gradient(
              135deg,
              #d9b65c,
              #f4dc91
            );
        }


        .michael-edit-button:hover,
        .michael-send-button:hover {
          transform: translateY(-1px);
        }


        .michael-edit-button:disabled,
        .michael-send-button:disabled {
          opacity: 0.55;

          cursor: not-allowed;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {

          .michael-chat-overlay {
            padding: 12px;
          }


          .michael-chat-window {
            width: 100%;

            height: 92vh;

            border-radius: 21px;
          }


          .michael-chat-header {
            min-height: 95px;

            padding:
              16px 55px 16px 12px;
          }


          .michael-chat-profile {
            gap: 9px;
          }


          .michael-chat-avatar {
            width: 42px;
            height: 42px;

            font-size: 20px;
          }


          .michael-chat-profile h3 {
            font-size: 24px;
          }


          .michael-chat-profile span {
            font-size: 14px;
          }


          .michael-chat-messages {
            padding: 20px 16px;
          }


          .michael-chat-input {
            padding: 13px;
          }


          .michael-chat-input button {
            width: 46px;
            height: 46px;
          }


          .michael-confirm-box {
            width: 94vw;

            max-height: 92vh;

            padding:
              25px 17px 17px;
          }


          .michael-confirm-box h2 {
            font-size: 29px;
          }


          .michael-confirm-intro {
            font-size: 15px;
          }


          .michael-confirm-content strong {
            font-size: 15px;
          }


          .michael-edit-content input,
          .michael-edit-content textarea {
            font-size: 15px;
          }


          .michael-confirm-buttons {
            gap: 7px;
          }


          .michael-edit-button,
          .michael-send-button {
            font-size: 15px;
          }

        }

      `}</style>

        </>
    );
}

export default ChatbotModal;