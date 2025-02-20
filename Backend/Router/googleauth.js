import { Router } from "express";
import passport from "passport";
const router=Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



router.get("/auth/user", (req, res) => {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});
export default router;