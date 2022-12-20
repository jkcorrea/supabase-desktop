import { useCallback } from 'react'
import clsx from 'clsx'
import { motion, PanInfo, useMotionValue } from 'framer-motion'

type Props = {
  orientation: 'top' | 'bottom' | 'left' | 'right'
  initialSize: number
  className?: string
  children: React.ReactNode
}

const ResizablePane = ({ initialSize, orientation, className, children }: Props) => {
  const size = useMotionValue(initialSize)

  const handleDrag = useCallback((_event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    const delta = orientation === 'top' || orientation === 'bottom' ? info.delta.y : info.delta.x
    const newHeight = size.get() + delta
    if (newHeight > 200 && newHeight < 1000) {
      size.set(size.get() + delta)
    }
  }, [])

  return (
    <motion.div
      className={clsx('relative', className)}
      style={{
        height: orientation === 'top' || orientation === 'bottom' ? size : undefined,
        width: orientation === 'left' || orientation === 'right' ? size : undefined,
      }}
      onDoubleClick={() => size.set(initialSize)}
    >
      {children}

      <motion.div
        drag={orientation === 'top' || orientation === 'bottom' ? 'y' : 'x'}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        className={clsx(
          'absolute z-10',
          orientation === 'top'
            ? 'inset-x-0 top-0 h-1 cursor-n-resize'
            : orientation === 'bottom'
            ? 'inset-x-0 bottom-0 h-1 cursor-s-resize'
            : orientation === 'right'
            ? 'inset-y-0 right-0 w-1 cursor-e-resize'
            : 'inset-y-0 left-0 w-1 cursor-w-resize',
        )}
      />
    </motion.div>
  )
}

export default ResizablePane
