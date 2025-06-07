const DECISION_THRESHOLD = 80; // The threshold for deciding whether to accept or reject the card 
let isAnimating = false;
let pullDeltax = 0; // The distance the user has pulled down

function startDrag(event) {
  if (isAnimating) return;

  //get the first atrticle element  
  const actualCard = event.target.closest('article');

  //get initial position of the mouse or finger
  const startX = event.pageX ?? event.touches[0].pageX;
  console.log(startX);

  //Listen to the mouse, and touch movements
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend', onEnd, { passive: true });

  function onMove(event) {
    //Current positio of the nmouse or finger
  const currentX = event.pageX ?? event.touches[0].pageX;
  //The distance between the initial position and the current position
  pullDeltax = currentX - startX;
    // No distance pulled, do nothing
  if (pullDeltax === 0) return
    //change the flag to indicate we are animating
  isAnimating = true;
    const deg = pullDeltax / 10; // Calculate the rotation degree based on the pull distance
    actualCard.style.transform = `translatex(${pullDeltax}px) rotate(${deg}deg)`;
    actualCard.style.cursor = 'grabbing';
}


function onEnd(event) {
    // Remove the event listeners
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);

    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);

    // Reset the flag
    isAnimating = false;
    // Reset the distance
    pullDeltax = 0;
    // Reset the transform style
    actualCard.style.transform = 'none';
    // Reset the cursor style
    actualCard.style.cursor = 'grab';
    // Optionally, you can add a transition effect for smoothness
    actualCard.style.transition = 'transform 0.3s ease-out';
    // Remove the transition after it completes
    setTimeout(() => {
      actualCard.style.transition = 'none';
    }, 300);

    const decisionMade = Math.abs(pullDeltax) >= DECISION_THRESHOLD;

    if (decisionMade){
        const goRight = pulldeltaX >= 0;
        // If the user pulled to the right, accept the card
        const goLeft = !goRight;

    // Add the class to animate the card out of view
        actualCard.classList.add(goRight ? 'go-right' : 'go-left');
    }else {
        console.log('pensando...');
    }
    }
}    



document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, { passive: true });
