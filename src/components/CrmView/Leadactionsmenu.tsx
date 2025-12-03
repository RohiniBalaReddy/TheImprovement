import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Popper,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
} from "@mui/material";
import { FaUserPlus, FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import Button from "@/common/Button";
import Modal from "@/common/Modal";

import { Lead } from "./types";

type LeadActionsMenuProps = {
  lead: Lead;
  roleUsers: { id: number; name: string }[];

  onAssign: (leadId: number, userId: number) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
};

export function LeadActionsMenu({
  lead,
  roleUsers,

  onAssign,
  onEdit,
  onDelete,
}: LeadActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [assignAnchorEl, setAssignAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [assignHovering, setAssignHovering] = useState(false);
  const isAssignOpen = Boolean(assignAnchorEl) || assignHovering;

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const closeAssignSubmenu = () => {
    setAssignAnchorEl(null);
    setAssignHovering(false);
  };

  const handleEditClick = () => {
    onEdit(lead);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  return (
    <>
      <Tooltip title="Actions" arrow>
        <IconButton
          aria-label="lead actions"
          onClick={handleMenuOpen}
          className="!p-1 !bg-white hover:!bg-gray-100 !shadow-sm"
          size="small"
        >
          <IoMdMore size={18} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 6,
          sx: { borderRadius: 2, minWidth: 120, py: 0.5 },
        }}
      >
        <MenuItem
          onMouseEnter={(e) =>
            setAssignAnchorEl(e.currentTarget as HTMLElement)
          }
          onMouseLeave={() => {
            if (!assignHovering) setAssignAnchorEl(null);
          }}
          sx={{ minHeight: 10, py: 0.5, fontSize: 12 }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            <FaUserPlus className="text-gray-700 md:text-[12px] text-[10px]" />
          </ListItemIcon>
          <span className="font-Gordita-Medium md:text-[12px] text-[10px]">
            Assign to…
          </span>

          <Popper
            open={isAssignOpen}
            anchorEl={assignAnchorEl}
            placement="right-start"
            modifiers={[{ name: "offset", options: { offset: [4, 0] } }]}
            style={{ zIndex: 1302 }}
          >
            <ClickAwayListener onClickAway={closeAssignSubmenu}>
              <Paper
                onMouseEnter={() => setAssignHovering(true)}
                onMouseLeave={closeAssignSubmenu}
                elevation={6}
                sx={{ borderRadius: 1.5, minWidth: 180, py: 0.5 }}
              >
                <List dense disablePadding>
                  {roleUsers?.length ? (
                    roleUsers.map((u: { id: number; name: string }) => {
                      const isCurrent = u.name === lead.assignedTo;
                      return (
                        <ListItemButton
                          key={u.id}
                          dense
                          sx={{ py: 0.25, minHeight: 32 }}
                          onClick={() => {
                            onAssign(lead.id, u.id);
                            closeAssignSubmenu();
                            handleMenuClose();
                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: 12 }}
                            primary={u.name}
                          />
                          {isCurrent && (
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <FaCheck size={12} />
                            </ListItemIcon>
                          )}
                        </ListItemButton>
                      );
                    })
                  ) : (
                    <ListItemButton
                      dense
                      sx={{ py: 0.25, minHeight: 32 }}
                      disabled
                    >
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                        primary="No users"
                      />
                    </ListItemButton>
                  )}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </MenuItem>

        <span>
          <MenuItem
            onClick={handleEditClick}
            sx={{ minHeight: 10, py: 0.5, fontSize: 12 }}
          >
            <ListItemIcon>
              <FaEdit className="text-[#2872a1] md:text-[12px] text-[10px]" />
            </ListItemIcon>
            <span className="text-[#2872a1] md:text-[12px] text-[10px] font-Gordita-Medium">
              Edit
            </span>
          </MenuItem>
        </span>

        <span>
          <MenuItem
            onClick={handleDeleteClick}
            sx={{ minHeight: 10, py: 0.5, fontSize: 12 }}
          >
            <ListItemIcon>
              <FaTrashAlt className="text-red-600 md:text-[12px] text-[10px]" />
            </ListItemIcon>
            <span className="text-red-500 md:text-[12px] text-[10px] font-Gordita-Medium">
              Delete
            </span>
          </MenuItem>
        </span>
      </Menu>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmOpen}
        closeModal={() => setConfirmOpen(false)}
        rootCls="z-[99999]"
        titleCls="font-Gordita-Medium md:text-[18px] text-[12px] text-center text-[#2872a1]"
        isCloseRequired={false}
        className="md:max-w-[500px] max-w-[270px]"
      >
        <div className="md:px-2 py-1 p-1 flex flex-col gap-2 z-20">
          <div className="flex justify-between items-center md:mb-2 mb-1">
            <h3 className="md:text-[16px] text-center w-full text-[12px] font-Gordita-Medium text-gray-900">
              Confirm Deletion
            </h3>
          </div>
          <p className="md:text-[12px] text-center text-[10px] text-gray-500 mb-2">
            Are you sure you want to delete this Lead? This action cannot be
            undone.
          </p>
          <div className="md:mt-2 mt-1 flex items-end justify-end gap-2 md:space-x-3 space-x-1">
            <Button
              className="border-2 font-Gordita-Medium md:text-[12px] text-[10px] btn-text border-gray-300 md:px-3 px-2 md:py-1 py-1 rounded-md"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white font-Gordita-Medium md:text-[12px] text-[10px] md:px-3 px-2 md:py-1 py-1 rounded-md"
              onClick={() => {
                onDelete(lead);
                setConfirmOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
