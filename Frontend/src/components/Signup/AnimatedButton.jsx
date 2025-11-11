import React from 'react';
import styled from 'styled-components';

const AnimatedButton = ({ text, type }) => {
  return (
    <StyledWrapper>
      <button type={type}>
        {text}
        <div id="clip">
          <div id="leftTop" className="corner" />
          <div id="rightBottom" className="corner" />
          <div id="rightTop" className="corner" />
          <div id="leftBottom" className="corner" />
        </div>
        <span id="rightArrow" className="arrow" />
        <span id="leftArrow" className="arrow" />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    position: relative;
    width: 300px;  
    height: 4em; 
    outline: none;
    transition: 0.1s;
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: bold;
    color: #FF3B3B;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 auto;  
    display: block;
    cursor: pointer;
    z-index: 1;   
  }

  #clip {
    --color: #FF3B3B;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 5px double var(--color);
    box-shadow: inset 0px 0px 15px rgba(255, 59, 59, 0.5);
    -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  }

  .arrow {
    position: absolute;
    transition: 0.2s;
    background-color: #FF3B3B;
    top: 35%;
    width: 11%;
    height: 30%;
  }

  #leftArrow {
    left: -13.5%;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }

  #rightArrow {
    -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
    left: 102%;
  }

  button:hover #rightArrow {
    background-color: #ff6b6b;
    left: -15%;
    animation: 0.6s ease-in-out both infinite alternate rightArrow8;
  }

  button:hover #leftArrow {
    background-color: #ff6b6b;
    left: 103%;
    animation: 0.6s ease-in-out both infinite alternate leftArrow8;
  }

  .corner {
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: #FF3B3B;
    box-shadow: inset 1px 1px 8px #ff2222;
    transform: scale(1) rotate(45deg);
    transition: 0.2s;
  }

  #rightTop {
    top: -1.98em;
    left: 91%;
  }

  #leftTop {
    top: -1.96em;
    left: -3.0em;
  }

  #leftBottom {
    top: 2.10em;
    left: -2.15em;
  }

  #rightBottom {
    top: 45%;
    left: 88%;
  }

  button:hover #leftTop {
    animation: 0.1s ease-in-out 0.05s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightTop {
    animation: 0.1s ease-in-out 0.15s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightBottom {
    animation: 0.1s ease-in-out 0.25s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
  }

  button:hover #leftBottom {
    animation: 0.1s ease-in-out 0.35s both changeColor8,
    0.2s linear 0.4s both lightEffect8;
  }

  button:hover .corner {
    transform: scale(1.25) rotate(45deg);
  }

  button:hover #clip {
    animation: 0.2s ease-in-out 0.55s both greenLight8;
    --color: #ff6b6b;
  }

  @keyframes changeColor8 {
    from {
      background-color: #FF3B3B;
    }
    to {
      background-color: #ff6b6b;
    }
  }

  @keyframes lightEffect8 {
    from {
      box-shadow: 1px 1px 5px #ff6b6b;
    }
    to {
      box-shadow: 0 0 2px #ff6b6b;
    }
  }

  @keyframes greenLight8 {
    from {
    }
    to {
      box-shadow: inset 0px 0px 32px #ff6b6b;
    }
  }

  @keyframes leftArrow8 {
    from {
      transform: translate(0px);
    }
    to {
      transform: translateX(10px);
    }
  }

  @keyframes rightArrow8 {
    from {
      transform: translate(0px);
    }
    to {
      transform: translateX(-10px);
    }
  }
`;

export default AnimatedButton;