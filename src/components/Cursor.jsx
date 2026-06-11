import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const followerEl = followerRef.current;
    if (!cursor || !followerEl) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.12;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.12;
      followerEl.style.left = follower.current.x + 'px';
      followerEl.style.top = follower.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      followerEl.style.transform = 'translate(-50%,-50%) scale(0.5)';
    };
    const shrink = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      followerEl.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,input,select').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
