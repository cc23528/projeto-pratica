/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package javaapplication1;

import java.awt.HeadlessException;
import java.awt.Image;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.ImageIcon;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.table.DefaultTableModel;


/**
 *
 * @author mathe
 */
public class Main_Window extends javax.swing.JFrame {

    /**
     * Creates new form Main_Window
     */
    public Main_Window() {
        getConnection();
        initComponents(); 
        Show_Products_In_JTable();
    }
    
    String ImgPath = null;
    int pos = 0;
    
    private Connection getConnection() {
    Connection con;
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://db4free.net:3306/bd23528", "bd23528", "Escola@123");
        return con;
    } catch (ClassNotFoundException | SQLException ex) {
        Logger.getLogger(Main_Window.class.getName()).log(Level.SEVERE, null, ex);
        return null;
    }
}

    // Check Input fields
    public boolean checkInputs()
    {
        if(txt_id.getText() == null
            ||  txt_bebida.getText() == null
            ||  txt_tipo.getText() == null
            ||  txt_quantidade.getText() == null
            ||  txt_preco.getText() == null
            ){
                return false;
        }else{
                try{
                    Float.parseFloat(txt_preco.getText());
                    return true;
                }catch(Exception ex)
                {
                    return false;
                }
        }
        
    }
            
    
    // Resize Image
    
    public ImageIcon ResizeImage(String imagePath, byte[] pic)
    {
        ImageIcon myImage;
        
        if(imagePath != null)
        {
            myImage = new ImageIcon(imagePath);
        }else{
            myImage = new ImageIcon(pic);
        }
        
        Image img = myImage.getImage();
        Image img2 = img.getScaledInstance(bl_image.getWidth(), bl_image.getHeight(), Image.SCALE_SMOOTH);
        ImageIcon image = new ImageIcon(img2);
        
        return image;
    }
    
    // Display Data in JTable: 
        //      1 - Fill ArrayList With The Data
            public ArrayList<Product> getProductList()
            {
                ArrayList<Product> productList = new ArrayList<Product>();
                Connection con = getConnection();
                String query = "SELECT * FROM bebida";
                
                ResultSet rs;
                Statement st;
            
                try{
                    st = con.createStatement();
                    rs = st.executeQuery(query);
                    Product product;
                    
                    while(rs.next())
                    {
                        product = new Product(rs.getInt("id_bebida"),rs.getString("nome_bebida"),rs.getString("tipo_bebida"),rs.getInt("quantidade_bebida"),Float.parseFloat(rs.getString("preco_bebida")), rs.getBytes("imagem_bebida"));
                        productList.add(product);
                    }
                    
                } catch (SQLException ex) {
                    Logger.getLogger(Main_Window.class.getName()).log(Level.SEVERE, null, ex);
                }
                
                return productList;
            }
    
        //      2 - Populate The JTable
            
            private void Show_Products_In_JTable()
            {
                ArrayList<Product> list = getProductList();
                DefaultTableModel model = (DefaultTableModel)JTable_Products.getModel();
                
                // clear JTable
                model.setRowCount(0);
                Object[] row = new Object[6];
                for(int i = 0; i < list.size(); i++)
                {
                    row[0] = list.get(i).getId();
                    row[1] = list.get(i).getName();
                    row[2] = list.get(i).getType();
                    row[3] = list.get(i).getQuantity();
                    row[4] = list.get(i).getPrice();
                    row[5] = list.get(i).getImage();
                    
                    model.addRow(row);
                }                
            }
            
            public void ShowItem(int index)
            {
                try{
                    txt_id.setText(Integer.toString(getProductList().get(index).getId()));
                    txt_bebida.setText(getProductList().get(index).getName());
                    txt_tipo.setText(getProductList().get(index).getType());
                    txt_quantidade.setText(Integer.toString(getProductList().get(index).getQuantity()));
                    txt_preco.setText(Float.toString(getProductList().get(index).getPrice()));
                } catch (Exception ex){
                    Logger.getLogger(Main_Window.class.getName()).log(Level.SEVERE, null, ex); 
                }
                
                bl_image.setIcon(ResizeImage(null, getProductList().get(index).getImage()));
            }
        
    
    
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        bl_image = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        JTable_Products = new javax.swing.JTable();
        jLabel7 = new javax.swing.JLabel();
        txt_quantidade = new javax.swing.JTextField();
        jLabel8 = new javax.swing.JLabel();
        jButton1 = new javax.swing.JButton();
        Btn_First = new javax.swing.JButton();
        Btn_inserir = new javax.swing.JButton();
        Btn_atualizar = new javax.swing.JButton();
        Btn_deletar = new javax.swing.JButton();
        jButton6 = new javax.swing.JButton();
        jButton7 = new javax.swing.JButton();
        jButton8 = new javax.swing.JButton();
        txt_id = new javax.swing.JTextField();
        txt_bebida = new javax.swing.JTextField();
        txt_tipo = new javax.swing.JTextField();
        txt_preco = new javax.swing.JTextField();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jPanel1.setBackground(new java.awt.Color(102, 204, 255));

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("ID:");

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel2.setText("Bebida:");

        jLabel3.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel3.setText("Preço:");

        jLabel5.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel5.setText("Imagem:");

        bl_image.setBackground(new java.awt.Color(0, 153, 255));
        bl_image.setOpaque(true);

        JTable_Products.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {

            },
            new String [] {
                "ID", "Bebida", "Tipo", "Quantidade", "Preço"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        JTable_Products.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                JTable_ProductsMouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(JTable_Products);

        jLabel7.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel7.setText("Tipo:");

        txt_quantidade.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        txt_quantidade.setPreferredSize(new java.awt.Dimension(59, 50));
        txt_quantidade.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_quantidadeActionPerformed(evt);
            }
        });

        jLabel8.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel8.setText("Quantidade:");

        jButton1.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jButton1.setText("Escolha a Imagem");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        Btn_First.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        Btn_First.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/fast-forward-double-left-arrows-symbol.png"))); // NOI18N
        Btn_First.setText("Primeiro");
        Btn_First.setAlignmentY(0.0F);
        Btn_First.setBorder(null);
        Btn_First.setIconTextGap(5);
        Btn_First.setInheritsPopupMenu(true);
        Btn_First.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Btn_FirstActionPerformed(evt);
            }
        });

        Btn_inserir.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        Btn_inserir.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/insert-memory-card (1).png"))); // NOI18N
        Btn_inserir.setText("Inserir");
        Btn_inserir.setAlignmentY(0.0F);
        Btn_inserir.setBorder(null);
        Btn_inserir.setIconTextGap(5);
        Btn_inserir.setInheritsPopupMenu(true);
        Btn_inserir.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Btn_inserirActionPerformed(evt);
            }
        });

        Btn_atualizar.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        Btn_atualizar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/refresh.png"))); // NOI18N
        Btn_atualizar.setText("Atualizar");
        Btn_atualizar.setAlignmentY(0.0F);
        Btn_atualizar.setBorder(null);
        Btn_atualizar.setIconTextGap(5);
        Btn_atualizar.setInheritsPopupMenu(true);
        Btn_atualizar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Btn_atualizarActionPerformed(evt);
            }
        });

        Btn_deletar.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        Btn_deletar.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/bin.png"))); // NOI18N
        Btn_deletar.setText("Deletar");
        Btn_deletar.setAlignmentY(0.0F);
        Btn_deletar.setBorder(null);
        Btn_deletar.setIconTextGap(5);
        Btn_deletar.setInheritsPopupMenu(true);
        Btn_deletar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                Btn_deletarActionPerformed(evt);
            }
        });

        jButton6.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jButton6.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/fast-forward-double-right-arrows-symbol.png"))); // NOI18N
        jButton6.setText("Ultimo");
        jButton6.setAlignmentY(0.0F);
        jButton6.setBorder(null);
        jButton6.setIconTextGap(5);
        jButton6.setInheritsPopupMenu(true);
        jButton6.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton6ActionPerformed(evt);
            }
        });

        jButton7.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jButton7.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/right-arrow.png"))); // NOI18N
        jButton7.setText("Próximo");
        jButton7.setAlignmentY(0.0F);
        jButton7.setBorder(null);
        jButton7.setIconTextGap(5);
        jButton7.setInheritsPopupMenu(true);
        jButton7.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton7ActionPerformed(evt);
            }
        });

        jButton8.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jButton8.setIcon(new javax.swing.ImageIcon(getClass().getResource("/javaapplication1/left-arrow.png"))); // NOI18N
        jButton8.setText("Anterior");
        jButton8.setAlignmentY(0.0F);
        jButton8.setBorder(null);
        jButton8.setIconTextGap(5);
        jButton8.setInheritsPopupMenu(true);
        jButton8.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton8ActionPerformed(evt);
            }
        });

        txt_id.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        txt_id.setPreferredSize(new java.awt.Dimension(59, 50));
        txt_id.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_idActionPerformed(evt);
            }
        });

        txt_bebida.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        txt_bebida.setPreferredSize(new java.awt.Dimension(59, 50));
        txt_bebida.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_bebidaActionPerformed(evt);
            }
        });

        txt_tipo.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        txt_tipo.setPreferredSize(new java.awt.Dimension(59, 50));
        txt_tipo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_tipoActionPerformed(evt);
            }
        });

        txt_preco.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        txt_preco.setPreferredSize(new java.awt.Dimension(59, 50));
        txt_preco.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_precoActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                        .addGroup(jPanel1Layout.createSequentialGroup()
                            .addGap(201, 201, 201)
                            .addComponent(jLabel1)
                            .addGap(18, 18, 18))
                        .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                            .addComponent(jLabel7)
                            .addGap(5, 5, 5)))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(133, 133, 133)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jLabel2)
                            .addComponent(jLabel8)
                            .addComponent(jLabel3)
                            .addComponent(jLabel5))
                        .addGap(5, 5, 5))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                        .addGap(105, 105, 105)
                        .addComponent(Btn_inserir, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(57, 57, 57)))
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel1Layout.createSequentialGroup()
                                .addComponent(Btn_atualizar, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(Btn_deletar, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel1Layout.createSequentialGroup()
                                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 185, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(210, 210, 210)
                                .addComponent(Btn_First, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jButton7, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jButton8, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(21, 21, 21)
                                .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(txt_bebida, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txt_tipo, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txt_quantidade, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txt_id, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txt_preco, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(bl_image, javax.swing.GroupLayout.PREFERRED_SIZE, 185, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 129, Short.MAX_VALUE)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 599, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(165, 165, 165))))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(20, 20, 20)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 50, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(txt_id, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel2)
                            .addComponent(txt_bebida, javax.swing.GroupLayout.PREFERRED_SIZE, 34, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel7)
                            .addComponent(txt_tipo, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel8)
                            .addComponent(txt_quantidade, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(30, 30, 30)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel3)
                            .addComponent(txt_preco, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addComponent(jLabel5)
                        .addGap(7, 7, 7)
                        .addComponent(bl_image, javax.swing.GroupLayout.PREFERRED_SIZE, 147, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(16, 16, 16))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(32, 32, 32)
                        .addComponent(jScrollPane1)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                .addComponent(Btn_First, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jButton7, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jButton8, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jButton6, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jButton1))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(Btn_atualizar, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(Btn_deletar, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(62, 62, 62))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                        .addComponent(Btn_inserir, javax.swing.GroupLayout.PREFERRED_SIZE, 30, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(87, 87, 87))))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void txt_quantidadeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_quantidadeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_quantidadeActionPerformed

    private void Btn_FirstActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Btn_FirstActionPerformed
        pos = 0;
        ShowItem(pos);
    }//GEN-LAST:event_Btn_FirstActionPerformed

    private void Btn_atualizarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Btn_atualizarActionPerformed
        
        if (checkInputs() && txt_id.getText() != null)
        {
            String UpdateQuery = null;
            PreparedStatement ps = null;
            Connection con = getConnection();
            
            // update without image
            if(ImgPath == null)
            {
                try {
                    UpdateQuery = "UPDATE bebida SET nome_bebida = ?, tipo_bebida = ?,"
                            + " quantidade_bebida = ?, preco_bebida = ? WHERE id_bebida = ?";
                    ps = con.prepareStatement(UpdateQuery);
                    ps.setString(1, txt_bebida.getText());
                    ps.setString(2, txt_tipo.getText());
                    ps.setString(3, txt_quantidade.getText());
                    ps.setString(4, txt_preco.getText());
                    
                    ps.setInt(5, Integer.parseInt(txt_id.getText()));
                    
                    ps.executeUpdate();                    
                    Show_Products_In_JTable();
                    JOptionPane.showMessageDialog(null, "Produto Atualizado");
                } catch (Exception ex) {
                    Logger.getLogger(Main_Window.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            else{
                
                try {
                InputStream img = new FileInputStream(new File(ImgPath));
                    
                    UpdateQuery = "UPDATE bebida SET nome_bebida = ?, tipo_bebida = ?,"
                            + " quantidade_bebida = ?, preco_bebida = ?, imagem_bebida = ? WHERE id_bebida = ?";
                    ps = con.prepareStatement(UpdateQuery);
                    ps.setString(1, txt_bebida.getText());
                    ps.setString(2, txt_tipo.getText());
                    ps.setString(3, txt_quantidade.getText());
                    ps.setString(4, txt_preco.getText());
                    
                    ps.setBlob(5, img);
                    
                    ps.setInt(6, Integer.parseInt(txt_id.getText()));
                                        
                    ps.executeUpdate();
                    Show_Products_In_JTable();
                    JOptionPane.showMessageDialog(null, "Produto Atualizado");
                } catch (Exception ex) 
                {
                    JOptionPane.showMessageDialog(null, ex.getMessage());
                }                           
            }
            // update With Image
            
        }
        else
        {
            JOptionPane.showMessageDialog(null, "Preencha todos os campos");
        }
        
    }//GEN-LAST:event_Btn_atualizarActionPerformed

    private void Btn_deletarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Btn_deletarActionPerformed
        if(!txt_id.getText().equals(""))
        {
            try {
                Connection con = getConnection();
                PreparedStatement ps;
                ps = con.prepareStatement("DELETE FROM bebida WHERE id_bebida = ?");
                int id = Integer.parseInt(txt_id.getText());
                ps.setInt(1, id);
                ps.executeUpdate();
                Show_Products_In_JTable();
                JOptionPane.showMessageDialog(null, "Produto Deletado com Sucesso");
            } catch (SQLException ex) {
                Logger.getLogger(Main_Window.class.getName()).log(Level.SEVERE, null, ex);
                JOptionPane.showMessageDialog(null, "O produto não foi deletado");
            }
        }
        else
        {
            JOptionPane.showMessageDialog(null, "O produto não foi deletado : Nenhum ID selecionado");
        }
    }//GEN-LAST:event_Btn_deletarActionPerformed

    private void jButton6ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton6ActionPerformed
        pos = getProductList().size()-1;
        ShowItem(pos);
    }//GEN-LAST:event_jButton6ActionPerformed

    private void jButton7ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton7ActionPerformed
        pos++;
        
        if(pos >= getProductList().size())
        {
                pos = getProductList().size()-1;
        }    
        ShowItem(pos);
    }//GEN-LAST:event_jButton7ActionPerformed

    private void jButton8ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton8ActionPerformed
        pos--;
        
        if(pos < 0)
        {
            pos = 0;
        }
        
        ShowItem(pos);
    }//GEN-LAST:event_jButton8ActionPerformed

    private void txt_idActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_idActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_idActionPerformed

    private void txt_bebidaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_bebidaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_bebidaActionPerformed

    private void txt_tipoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_tipoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_tipoActionPerformed

    private void txt_precoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_precoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_precoActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        
        JFileChooser file = new JFileChooser();
        file.setCurrentDirectory(new File(System.getProperty("user.home")));
        
        FileNameExtensionFilter filter = new FileNameExtensionFilter("*.image", "jpg","png");
        file.addChoosableFileFilter(filter);
        int result = file.showSaveDialog(null);
        if(result == JFileChooser.APPROVE_OPTION)
        {
            File selectedFile = file.getSelectedFile();
            String path = selectedFile.getAbsolutePath();
            bl_image.setIcon(ResizeImage(path, null));
            ImgPath = path;
        } else{
            System.out.println("Nenhum arquivo foi selecionado");
        }  
        
    }//GEN-LAST:event_jButton1ActionPerformed

    private void Btn_inserirActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_Btn_inserirActionPerformed
        
        if(checkInputs() && ImgPath != null){
            try {
                Connection con = getConnection();
                System.out.println("Test");
                PreparedStatement ps = con.prepareStatement("INSERT INTO bebida(id_bebida,nome_bebida,tipo_bebida,quantidade_bebida,preco_bebida,imagem_bebida) VALUES(?,?,?,?,?,?)");
                ps.setString(1, txt_id.getText());
                ps.setString(2, txt_bebida.getText());
                ps.setString(3, txt_tipo.getText());
                ps.setString(4, txt_quantidade.getText());
                ps.setString(5, txt_preco.getText());
                
                InputStream img = new FileInputStream(new File(ImgPath));
                ps.setBlob(6, img);  
                
                ps.executeUpdate();
                Show_Products_In_JTable();                
                JOptionPane.showMessageDialog(null, "Dados Inseridos");
            } catch (HeadlessException | FileNotFoundException | SQLException ex) {
                JOptionPane.showMessageDialog(null, ex.getMessage());
            }
        }else{
            JOptionPane.showMessageDialog(null, "Preencha todos os campos");
        }
    }//GEN-LAST:event_Btn_inserirActionPerformed

    private void JTable_ProductsMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_JTable_ProductsMouseClicked
       
        int index = JTable_Products.getSelectedRow();
        ShowItem(index);
                
    }//GEN-LAST:event_JTable_ProductsMouseClicked

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Main_Window.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Main_Window.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Main_Window.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Main_Window.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Main_Window().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton Btn_First;
    private javax.swing.JButton Btn_atualizar;
    private javax.swing.JButton Btn_deletar;
    private javax.swing.JButton Btn_inserir;
    private javax.swing.JTable JTable_Products;
    private javax.swing.JLabel bl_image;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton6;
    private javax.swing.JButton jButton7;
    private javax.swing.JButton jButton8;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTextField txt_bebida;
    private javax.swing.JTextField txt_id;
    private javax.swing.JTextField txt_preco;
    private javax.swing.JTextField txt_quantidade;
    private javax.swing.JTextField txt_tipo;
    // End of variables declaration//GEN-END:variables
}
