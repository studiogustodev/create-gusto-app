import { motion } from 'framer-motion'

const MountTransition = ({
  children,
  duration = 0.5,
  ease = 'easeOut',
}) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, ease }}
  >
    {children}
  </motion.div>
)

export default MountTransition
