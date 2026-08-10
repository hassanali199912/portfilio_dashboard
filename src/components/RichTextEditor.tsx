import {
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaLink,
  FaHeading,
} from 'react-icons/fa';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  minHeight?: number;
}

const TOOLBAR_COMMANDS = [
  { cmd: 'bold', icon: <FaBold size={14} />, title: 'Bold' },
  { cmd: 'italic', icon: <FaItalic size={14} />, title: 'Italic' },
  { cmd: 'underline', icon: <FaUnderline size={14} />, title: 'Underline' },
  { cmd: 'insertUnorderedList', icon: <FaListUl size={14} />, title: 'Bullet list' },
  { cmd: 'insertOrderedList', icon: <FaListOl size={14} />, title: 'Numbered list' },
  { cmd: 'formatBlock', icon: <FaHeading size={14} />, title: 'Heading', arg: 'h2' },
  { cmd: 'formatBlock', icon: <FaQuoteRight size={14} />, title: 'Quote', arg: 'blockquote' },
] as const;

export default function RichTextEditor({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  minHeight = 200,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const exec = useCallback(
    (command: string, arg?: string) => {
      if (disabled) return;
      editorRef.current?.focus();
      document.execCommand(command, false, arg);
      if (editorRef.current) {
        isInternalChange.current = true;
        onChange(editorRef.current.innerHTML);
      }
    },
    [disabled, onChange]
  );

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    if (disabled) return;
    const url = window.prompt('Enter URL');
    if (url) exec('createLink', url);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>

      <Box
        sx={{
          border: 1,
          borderColor: error ? 'error.main' : 'divider',
          borderRadius: 1,
          overflow: 'hidden',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            px: 1,
            py: 0.5,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'action.hover',
            flexWrap: 'wrap',
          }}
        >
          {TOOLBAR_COMMANDS.map((item) => (
            <Tooltip key={`${item.cmd}-${item.title}`} title={item.title}>
              <IconButton
                size="small"
                disabled={disabled}
                onMouseDown={(e) => {
                  e.preventDefault();
                  exec(item.cmd, 'arg' in item ? item.arg : undefined);
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
          <Tooltip title="Insert link">
            <IconButton size="small" disabled={disabled} onMouseDown={(e) => { e.preventDefault(); handleLink(); }}>
              <FaLink size={14} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          sx={{
            minHeight,
            p: 2,
            outline: 'none',
            typography: 'body2',
            '&:empty::before': {
              content: '"Write your content here..."',
              color: 'text.disabled',
            },
            '& h2': { typography: 'h5', mt: 1, mb: 1 },
            '& blockquote': {
              borderLeft: 3,
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              color: 'text.secondary',
            },
            '& ul, & ol': { pl: 3 },
            '& a': { color: 'primary.main' },
          }}
        />
      </Box>

      {helperText && (
        <FormHelperText error={error} sx={{ mx: 1.75 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
