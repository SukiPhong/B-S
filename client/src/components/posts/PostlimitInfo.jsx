import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import PropTypes from 'prop-types';
import { InfoIcon } from 'lucide-react';

const PostLimitInfo = ({ info }) => {
  const { dailyLimit, currentCount, remaining } = info;

  return (
    <Alert variant={remaining === 0 ? "destructive" : "default"}>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>
        Giới hạn đăng bài
      </AlertTitle>
      <AlertDescription className="mt-2">
      <div className="flex justify-between items-center">
          <span>Đã đăng trong hôm nay: <strong>{currentCount}</strong></span>
          <span>Còn lại: <strong>{remaining}</strong></span>
          <span>Tổng: <strong>{dailyLimit}</strong></span>
        </div>
        {remaining === 0 && (
          <p className="text-sm font-medium mt-2 text-red-500">
            Bạn đã đạt giới hạn đăng bài hôm nay. Vui lòng thử lại vào ngày mai.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};

PostLimitInfo.propTypes = {
  info: PropTypes.shape({
    dailyLimit: PropTypes.number.isRequired,
    currentCount: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostLimitInfo;