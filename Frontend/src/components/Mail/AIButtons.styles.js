import styled from 'styled-components';

export const StyledButtons = styled.div`
  display: flex;
  gap: 5rem;
  padding: 2rem 6rem;
  justify-content: center;

  .animated-btn {
    position: relative;
    padding: 12px 35px;
    background: #FF3B3B;
    font-size: 17px;
    font-weight: 500;
    color: white;
    border: 3px solid #FF3B3B;
    border-radius: 25px;
    box-shadow: 0 0 0 #ff3b3b8c;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .star-1, .star-2, .star-3, .star-4, .star-5, .star-6 {
    position: absolute;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 0 #fffdef);
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-1 { top: 20%; left: 20%; width: 25px; }
  .star-2 { top: 45%; left: 45%; width: 15px; }
  .star-3 { top: 40%; left: 40%; width: 5px; }
  .star-4 { top: 20%; left: 40%; width: 8px; }
  .star-5 { top: 25%; left: 45%; width: 15px; }
  .star-6 { top: 5%; left: 50%; width: 5px; }

  .animated-btn:hover {
    background: transparent;
    color: #FF3B3B;
    box-shadow: 0 0 25px #ff3b3b8c;
  }

  .animated-btn:hover .star-1 {
    top: -80%;
    left: -30%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .animated-btn:hover .star-2 {
    top: -25%;
    left: 10%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .animated-btn:hover .star-3 {
    top: 55%;
    left: 25%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .animated-btn:hover .star-4 {
    top: 30%;
    left: 80%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .animated-btn:hover .star-5 {
    top: 25%;
    left: 115%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .animated-btn:hover .star-6 {
    top: 5%;
    left: 60%;
    filter: drop-shadow(0 0 10px #FF3B3B);
    z-index: 2;
  }

  .fil0 {
    fill: #FF3B3B;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    
    .animated-btn {
      padding: 8px 20px;
      font-size: 14px;
    }
  }
`;